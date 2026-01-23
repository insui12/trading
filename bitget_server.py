import uvicorn
from fastapi import FastAPI, Response, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import threading
import time
import logging
import math
import uuid
import hashlib
import jwt
import requests
import traceback
import sys
import os
import ccxt
import pyupbit
from urllib.parse import urlencode

# === 1. FastAPI 서버 설정 ===
app = FastAPI()

# [중요] CORS 및 Private Network Access 설정
# 브라우저가 로컬 서버에 접근할 때 보안 경고를 띄우지 않도록 헤더를 설정합니다.
origins = [
    "http://localhost:5173",  # 개발 환경 리액트 주소
    "https://your-website.com" # ★ 실제 배포할 웹사이트 도메인으로 변경 필수!
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 테스트용 (실배포시 origins 변수 사용 권장)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PNA(Private Network Access) 허용 미들웨어
@app.middleware("http")
async def add_pna_header(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Private-Network"] = "true"
    return response

# === 2. 전역 상태 및 로거 ===
BOT_STATE = {
    "is_running": False,
    "logs": [],
    "status_msg": "대기 중",
    "current_step": 0,
    "current_step_label": "",
    "current_step_total": 8
}

DISPLAY_STEP_TOTAL = 8
DISPLAY_STEP_MAP = {
    2: (1, "매수"),
    3: (2, "헷징"),
    4: (3, "전송"),
    5: (4, "입금 확인"),
    6: (5, "매도"),
    7: (6, "숏 정리"),
    8: (7, "환전"),
    9: (8, "USDT 전송"),
}

# 로그를 메모리에 저장하여 웹으로 전송하는 핸들러
class ListHandler(logging.Handler):
    def emit(self, record):
        msg = self.format(record)
        BOT_STATE["logs"].append(msg)
        if len(BOT_STATE["logs"]) > 200: # 로그 최대 200개 유지
            BOT_STATE["logs"].pop(0)

# 일별 로그 파일 핸들러
class DailyFileHandler(logging.Handler):
    def __init__(self, log_dir, prefix="trade-"):
        super().__init__()
        self.log_dir = log_dir
        self.prefix = prefix
        self.current_date = None
        self.stream = None

    def emit(self, record):
        try:
            date_stamp = time.strftime("%Y%m%d")
            if self.current_date != date_stamp:
                if self.stream:
                    self.stream.close()
                filename = os.path.join(self.log_dir, f"{self.prefix}{date_stamp}.log")
                self.stream = open(filename, "a", encoding="utf-8")
                self.current_date = date_stamp
            msg = self.format(record)
            self.stream.write(msg + "\n")
            self.stream.flush()
        except Exception:
            self.handleError(record)

    def close(self):
        if self.stream:
            try:
                self.stream.close()
            except Exception:
                pass
        super().close()

LOG_DIR = os.path.join(os.path.dirname(__file__), "log")
os.makedirs(LOG_DIR, exist_ok=True)

formatter = logging.Formatter('%(asctime)s - %(message)s', datefmt='%y-%m-%d %H:%M:%S')

logger = logging.getLogger("bot")
logger.setLevel(logging.INFO)
logger.propagate = False
if not logger.handlers:
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(formatter)
    logger.addHandler(stream_handler)

trade_logger = logging.getLogger("bot.trade")
trade_logger.setLevel(logging.INFO)
trade_logger.propagate = False
trade_logger.handlers.clear()

list_handler = ListHandler()
list_handler.setFormatter(formatter)
trade_logger.addHandler(list_handler)

file_handler = DailyFileHandler(LOG_DIR)
file_handler.setFormatter(formatter)
trade_logger.addHandler(file_handler)

def reset_progress():
    BOT_STATE["current_step"] = 0
    BOT_STATE["current_step_label"] = ""
    BOT_STATE["current_step_total"] = DISPLAY_STEP_TOTAL

def update_display_step(step_num, label):
    BOT_STATE["current_step"] = step_num
    BOT_STATE["current_step_label"] = label
    BOT_STATE["current_step_total"] = DISPLAY_STEP_TOTAL
    status = f"Step {step_num}/{DISPLAY_STEP_TOTAL} {label}"
    BOT_STATE["status_msg"] = status
    trade_logger.info(status)

def stop_requested():
    return not BOT_STATE["is_running"]

def handle_stop():
    if stop_requested():
        BOT_STATE["status_msg"] = "중단됨"
        trade_logger.info("중단 요청으로 종료")
        return True
    return False

# === 3. 데이터 모델 ===
class BotConfig(BaseModel):
    BITGET_API: dict
    UPBIT_ACCESS: str
    UPBIT_SECRET: str
    BITGET_USDT_ADDRESS: str
    UPBIT_SOL_ADDRESS: str
    SYMBOL_NAME: str = 'SOL'
    SYMBOL_NETWORK: str = 'SOL'
    QTY: float = 0.11

class ChainAnalysisRequest(BaseModel):
    departure: str
    destination: str
    coin: str
    chain: str

NETWORK_ALIASES = {
    "TRC20": {"TRC20", "TRX", "TRON"},
    "TRX": {"TRC20", "TRX", "TRON"},
    "ERC20": {"ERC20", "ETH", "ETHEREUM"},
    "ETH": {"ERC20", "ETH", "ETHEREUM"},
    "BSC": {"BSC", "BEP20"},
    "BEP20": {"BSC", "BEP20"},
    "SOL": {"SOL", "SOLANA"},
    "ARB": {"ARB", "ARBITRUM", "ARBITRUMONE", "ARBONE"},
    "ARBITRUM": {"ARB", "ARBITRUM", "ARBITRUMONE", "ARBONE"},
    "OP": {"OP", "OPTIMISM"},
    "OPTIMISM": {"OP", "OPTIMISM"},
    "MATIC": {"MATIC", "POLYGON"},
    "POLYGON": {"MATIC", "POLYGON"},
    "AVAXC": {"AVAXC", "AVAX", "AVALANCHE", "AVALANCHEC", "AVALANCHECCHAIN", "AVAXCCHAIN"},
    "AVAX": {"AVAXC", "AVAX", "AVALANCHE", "AVALANCHEC", "AVALANCHECCHAIN", "AVAXCCHAIN"},
    "XRP": {"XRP", "XRPL", "RIPPLE"},
    "XRPL": {"XRP", "XRPL", "RIPPLE"},
    "DOT": {"DOT", "POLKADOT"},
    "POLKADOT": {"DOT", "POLKADOT"},
    "SUI": {"SUI"},
    "XPL": {"XPL"},
}

UPBIT_NET_TYPE_MAP = {
    "TRC20": "TRX",
    "TRX": "TRX",
    "ERC20": "ETH",
    "ETH": "ETH",
    "BEP20": "BSC",
    "BSC": "BSC",
}

ENV_LOADED = False

def load_env_file():
    global ENV_LOADED
    if ENV_LOADED:
        return
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    if not os.path.exists(env_path):
        ENV_LOADED = True
        return
    try:
        with open(env_path, "r", encoding="utf-8") as handle:
            for raw_line in handle:
                line = raw_line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" not in line:
                    continue
                key, value = line.split("=", 1)
                key = key.strip()
                value = value.strip().strip("\"").strip("'")
                if key and key not in os.environ:
                    os.environ[key] = value
    finally:
        ENV_LOADED = True

def normalize_network(value):
    if not value:
        return ""
    return "".join(ch for ch in str(value).strip().upper() if ch.isalnum())

def normalize_upbit_net_type(value):
    normalized = normalize_network(value)
    if not normalized:
        return ""
    return UPBIT_NET_TYPE_MAP.get(normalized, normalized)

def expand_network_aliases(value):
    normalized = normalize_network(value)
    aliases = NETWORK_ALIASES.get(normalized)
    if aliases:
        return {normalize_network(item) for item in aliases}
    return {normalized}

def network_supported(requested, available):
    if not requested:
        return False
    requested_set = expand_network_aliases(requested)
    available_set = {normalize_network(item) for item in available if item}
    return bool(requested_set & available_set)

def get_bitget_networks(bitget, symbol):
    currencies = bitget.fetch_currencies()
    currency = currencies.get(symbol)
    if not currency:
        return []
    networks = currency.get('networks') or {}
    names = set()
    for key, net in networks.items():
        if key:
            names.add(str(key))
        if isinstance(net, dict):
            for field in ('id', 'network', 'name'):
                value = net.get(field)
                if value:
                    names.add(str(value))
    return sorted(names)

def get_upbit_networks(access_key, secret_key, symbol, network=None):
    params = {'currency': symbol}
    net_type = normalize_upbit_net_type(network)
    if net_type:
        params['net_type'] = net_type
    query_string = urlencode(params).encode()
    m = hashlib.sha512()
    m.update(query_string)
    query_hash = m.hexdigest()

    payload_jwt = {
        'access_key': access_key,
        'nonce': str(uuid.uuid4()),
        'query_hash': query_hash,
        'query_hash_alg': 'SHA512',
    }
    jwt_token = jwt.encode(payload_jwt, secret_key, algorithm='HS256')
    if isinstance(jwt_token, bytes):
        jwt_token = jwt_token.decode("utf-8")
    headers = {"Authorization": f"Bearer {jwt_token}"}

    res = requests.get("https://api.upbit.com/v1/withdraws/chance", params=params, headers=headers, timeout=10)
    data = res.json()
    if res.status_code != 200:
        raise RuntimeError(data)

    networks = set()
    currency = data.get('currency')
    if isinstance(currency, dict):
        for key in ('net_type', 'network', 'withdraw_net_type'):
            value = currency.get(key)
            if value:
                networks.add(str(value))

    net_type = data.get('net_type')
    if net_type:
        networks.add(str(net_type))

    network_list = data.get('networks')
    if isinstance(network_list, list):
        for item in network_list:
            if isinstance(item, dict):
                for key in ('net_type', 'network', 'name'):
                    value = item.get(key)
                    if value:
                        networks.add(str(value))
            elif isinstance(item, str):
                networks.add(item)

    return sorted(networks)

def validate_symbol_network(cfg):
    symbol = (cfg.SYMBOL_NAME or "").strip().upper()
    network = (cfg.SYMBOL_NETWORK or "").strip()
    if not symbol:
        return "Symbol is required."
    if not network:
        return "Network is required."

    bitget_options = {
        'apiKey': cfg.BITGET_API['apiKey'],
        'secret': cfg.BITGET_API['secret'],
        'password': cfg.BITGET_API['password'],
        'enableRateLimit': True,
        'options': {'defaultType': 'spot'}
    }
    bitget = ccxt.bitget(bitget_options)
    try:
        bitget_networks = get_bitget_networks(bitget, symbol)
        if not bitget_networks:
            return f"Network validation failed: {symbol} not found on Bitget."
        if not network_supported(network, bitget_networks):
            return f"Network validation failed: {symbol} not supported on Bitget for network {network}."
    except Exception as e:
        return f"Network validation failed: Bitget lookup error ({e})."
    finally:
        try:
            bitget.close()
        except Exception:
            pass

    try:
        upbit_networks = get_upbit_networks(cfg.UPBIT_ACCESS, cfg.UPBIT_SECRET, symbol, network)
        if upbit_networks and not network_supported(network, upbit_networks):
            return f"Network validation failed: {symbol} not supported on Upbit for network {network}."
    except Exception as e:
        return f"Network validation failed: Upbit lookup error ({e})."

    return ""

# === 4. 매매 로직 (스레드 실행용) ===
def smart_order(exchange_name, order_type, symbol, qty, is_buy, api_context):
    attempt = 1
    bitget = api_context['bitget']
    upbit = api_context['upbit']

    while True:
        if handle_stop():
            return False
        try:
            price = 0
            if exchange_name == 'bitget':
                ticker = bitget.fetch_ticker(symbol)
                price = ticker['ask'] if is_buy else ticker['bid']
            else: # upbit
                ob = pyupbit.get_orderbook(symbol)
                price = ob['orderbook_units'][0]['ask_price'] if is_buy else ob['orderbook_units'][0]['bid_price']

            trade_logger.info(f" -> [{attempt}회차] {'매수' if is_buy else '매도'} 시도: {price} (수량: {qty})")

            order_id = None
            if exchange_name == 'bitget':
                if is_buy:
                    order = bitget.create_limit_buy_order(symbol, qty, price)
                else:
                    order = bitget.create_limit_sell_order(symbol, qty, price)
                order_id = order['id']
            else: # upbit
                if is_buy:
                    res = upbit.buy_limit_order(symbol, price, qty)
                else:
                    res = upbit.sell_limit_order(symbol, price, qty)
                if 'uuid' not in res:
                    time.sleep(1)
                    continue
                order_id = res['uuid']

            is_filled = False
            for _ in range(5):
                if handle_stop():
                    return False
                time.sleep(1)
                if exchange_name == 'bitget':
                    status = bitget.fetch_order(order_id, symbol)['status']
                else:
                    status = upbit.get_order(order_id).get('state')

                if status in ['closed', 'done']:
                    is_filled = True
                    break

            if is_filled:
                trade_logger.info(f" -> [체결 완료] {exchange_name} 주문 성공")
                return True

            trade_logger.info(" -> 미체결: 취소 후 갱신")
            if exchange_name == 'bitget':
                try:
                    bitget.cancel_order(order_id, symbol)
                except Exception:
                    pass
            else:
                upbit.cancel_order(order_id)
            time.sleep(0.5)
            attempt += 1
        except Exception as e:
            trade_logger.error(f"스마트 주문 중 에러: {e}")
            time.sleep(1)

def run_trading_logic(cfg: BotConfig):
    BOT_STATE["is_running"] = True
    BOT_STATE["status_msg"] = "실행 중..."
    reset_progress()

    try:
        bitget_options = {
            'apiKey': cfg.BITGET_API['apiKey'],
            'secret': cfg.BITGET_API['secret'],
            'password': cfg.BITGET_API['password'],
            'enableRateLimit': True,
            'options': {'defaultType': 'spot'}
        }
        bitget = ccxt.bitget(bitget_options)

        bitget_future_options = bitget_options.copy()
        bitget_future_options['options'] = {'defaultType': 'swap'}
        bitget_future = ccxt.bitget(bitget_future_options)

        upbit = pyupbit.Upbit(cfg.UPBIT_ACCESS, cfg.UPBIT_SECRET)

        api_context = {'bitget': bitget, 'upbit': upbit}

        SYMBOL = cfg.SYMBOL_NAME
        NETWORK = cfg.SYMBOL_NETWORK
        QTY = cfg.QTY

        fut_symbol = f"{SYMBOL}/USDT:USDT"
        bg_symbol = f"{SYMBOL}/USDT"
        up_symbol = f"KRW-{SYMBOL}"
        up_usdt_symbol = "KRW-USDT"

        tx_qty = 0

        logger.info("=== [Arbitrage Bot] 시작 ===")

        if handle_stop():
            return

        # [1] 설정 (표시하지 않음)
        logger.info("[1] 설정: 비트겟 안전장치 가동")
        try:
            bitget_future.set_leverage(1, fut_symbol)
            bitget_future.set_position_mode(False, fut_symbol)
        except Exception:
            pass

        if handle_stop():
            return

        # [2] 진입 (매수) -> 표시 Step 1
        update_display_step(1, "매수")
        trade_logger.info("비트겟 현물 스마트 매수")
        bal = bitget.fetch_balance()
        if bal['total'].get(SYMBOL, 0) >= QTY * 0.9:
            trade_logger.info(" -> [Skip] 이미 보유 중입니다.")
        else:
            if not smart_order('bitget', 'limit', bg_symbol, QTY, True, api_context):
                return

        if handle_stop():
            return

        # [3] 방어 (헷징) -> 표시 Step 2
        update_display_step(2, "헷징")
        trade_logger.info("비트겟 선물 숏 헷징")
        try:
            bitget_future.create_market_sell_order(fut_symbol, QTY)
            trade_logger.info(" -> 숏 포지션 진입 완료")
        except Exception as e:
            trade_logger.error(f"숏 진입 실패: {e}")
            return

        if handle_stop():
            return

        # [4] 이동 (전송) -> 표시 Step 3
        update_display_step(3, "전송")
        trade_logger.info("비트겟 -> 업비트 전송")
        try:
            bal = bitget.fetch_balance()
            avail = bal['free'].get(SYMBOL, 0)
            tx_qty = math.floor(avail * 10000) / 10000

            if tx_qty < 0.05:
                trade_logger.error(" -> 잔액 부족으로 중단")
                return

            bitget.withdraw(SYMBOL, tx_qty, cfg.UPBIT_SOL_ADDRESS, params={'network': NETWORK})
            trade_logger.info(f" -> 출금 요청 완료 ({tx_qty} {SYMBOL})")
        except Exception as e:
            trade_logger.error(f"전송 실패: {e}")
            return

        if handle_stop():
            return

        # [5] 검증 (입금 대기) -> 표시 Step 4
        update_display_step(4, "입금 확인")
        trade_logger.info("업비트 입금 확인 대기")
        start_bal = upbit.get_balance(up_symbol)
        target_bal = start_bal + (tx_qty * 0.9)
        trade_logger.info(f" -> 검증 시작 | 시작 잔고: {start_bal} | 목표 잔고: {target_bal}")

        while True:
            if handle_stop():
                return
            curr = upbit.get_balance(up_symbol)
            if curr >= target_bal:
                trade_logger.info(f" -> [확인 완료] 현재 잔고: {curr} >= 목표: {target_bal}")
                break
            trade_logger.info(f" -> 대기중... 현재: {curr} / 목표: {target_bal} (부족량: {target_bal - curr:.4f})")
            time.sleep(10)

        if handle_stop():
            return

        # [6] 청산 (업비트 매도) -> 표시 Step 5
        update_display_step(5, "매도")
        trade_logger.info("업비트 SOL 매도 (현금화)")
        sell_qty = upbit.get_balance(up_symbol)
        trade_logger.info(f" -> 현재 잔고 조회 결과: {sell_qty} SOL")

        if sell_qty > 0.0001:
            if not smart_order('upbit', 'limit', up_symbol, sell_qty, False, api_context):
                return
        else:
            trade_logger.warning(" -> 매도할 잔고가 없습니다. (이미 팔렸거나 입금 안됨)")

        if handle_stop():
            return

        # [7] 종료 (숏 정리) -> 표시 Step 6
        update_display_step(6, "숏 정리")
        trade_logger.info("비트겟 숏 포지션 정리")
        try:
            bitget_future.create_market_buy_order(fut_symbol, QTY, params={'reduceOnly': True})
            trade_logger.info(" -> 숏 포지션 종료 완료")
        except Exception as e:
            trade_logger.error(f"숏 종료 실패 (수동 확인 필요): {e}")

        if handle_stop():
            return

        # [8] 환전 (KRW -> USDT) -> 표시 Step 7
        update_display_step(7, "환전")
        trade_logger.info("KRW -> USDT 재매수")
        time.sleep(2)

        krw_bal = upbit.get_balance("KRW")
        use_krw = krw_bal * 0.999

        ob = pyupbit.get_orderbook(up_usdt_symbol)
        curr_price = ob['orderbook_units'][0]['ask_price']
        buy_usdt_qty = math.floor((use_krw / curr_price) * 10000) / 10000

        if use_krw > 5000:
            trade_logger.info(f" -> 환전 시도: {int(use_krw)}원 (약 {buy_usdt_qty} USDT)")
            if not smart_order('upbit', 'limit', up_usdt_symbol, buy_usdt_qty, True, api_context):
                return
        else:
            trade_logger.warning(" -> KRW 잔액 부족으로 환전 스킵")

        if handle_stop():
            return

        # [9] 회수 (USDT 전송) -> 표시 Step 8
        update_display_step(8, "USDT 전송")
        trade_logger.info("USDT -> 비트겟 전송 (TRC20)")
        time.sleep(2)

        usdt_bal = upbit.get_balance(up_usdt_symbol)
        raw_qty = usdt_bal - 1.5
        send_qty = math.floor(raw_qty * 100) / 100

        if send_qty <= 0:
            trade_logger.warning(" -> 보낼 USDT 잔액이 부족합니다.")
            return

        trade_logger.info(f" -> 전송 시도: {send_qty} USDT -> {cfg.BITGET_USDT_ADDRESS}")

        try:
            payload = {
                'currency': 'USDT',
                'net_type': 'TRX',
                'amount': str(send_qty),
                'address': cfg.BITGET_USDT_ADDRESS,
                'transaction_type': 'default'
            }

            query_string = urlencode(payload).encode()
            m = hashlib.sha512()
            m.update(query_string)
            query_hash = m.hexdigest()

            payload_jwt = {
                'access_key': cfg.UPBIT_ACCESS,
                'nonce': str(uuid.uuid4()),
                'query_hash': query_hash,
                'query_hash_alg': 'SHA512',
            }
            jwt_token = jwt.encode(payload_jwt, cfg.UPBIT_SECRET, algorithm='HS256')
            authorize_token = 'Bearer {}'.format(jwt_token)
            headers = {"Authorization": authorize_token}

            res = requests.post("https://api.upbit.com/v1/withdraws/coin", json=payload, headers=headers)
            result = res.json()

            if 'uuid' in result:
                trade_logger.info(f" -> [성공] 출금 신청 완료! (UUID: {result['uuid']})")
            else:
                trade_logger.error(f" -> 송금 요청 실패: {result}")
        except Exception as e:
            trade_logger.error(f" -> 송금 중 에러 발생: {e}")
            trade_logger.error(traceback.format_exc())

        trade_logger.info("=== 프로세스 종료 ===")
        BOT_STATE["status_msg"] = "완료"

    except Exception as e:
        trade_logger.error(f"봇 실행 중 오류: {e}")
        trade_logger.error(traceback.format_exc())
    finally:
        BOT_STATE["is_running"] = False
        if BOT_STATE["status_msg"] == "실행 중...":
            BOT_STATE["status_msg"] = "대기 중"

# === 5. API 엔드포인트 ===
@app.get("/")
def health_check():
    return {"status": "ok", "msg": "MatgaBot Local Server"}

@app.get("/status")
def get_status():
    return {
        "is_running": BOT_STATE["is_running"],
        "status_msg": BOT_STATE["status_msg"],
        "logs": BOT_STATE["logs"][-50:],
        "current_step": BOT_STATE["current_step"],
        "current_step_label": BOT_STATE["current_step_label"],
        "current_step_total": BOT_STATE["current_step_total"]
    }

@app.post("/chain-analysis")
def chain_analysis(request: ChainAnalysisRequest):
    load_env_file()
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        return {"success": False, "msg": "OPENAI_API_KEY is not set."}

    try:
        from openai import OpenAI
    except Exception:
        return {"success": False, "msg": "OpenAI SDK is not installed."}

    departure = (request.departure or "").strip().upper()
    destination = (request.destination or "").strip().upper()
    coin = (request.coin or "").strip().upper()
    chain = (request.chain or "").strip().upper()

    if not departure or not destination or not coin or not chain:
        return {"success": False, "msg": "All fields are required."}

    prompt = (
        f"{departure}->{destination} {coin}/{chain} 이체할때 소요되는 이체시간을 추정해서 알려줘. "
        "답변 양식은 정확하게, 오차는 최소로, 범위도 최소로 "
        "[거래소1 -> 거래소2, 코인명/체인명, 약 00~00분 ]"
    )

    try:
        client = OpenAI(api_key=api_key)
        response = client.responses.create(
            model="gpt-4o-mini",
            input=prompt,
            store=False,
        )
        result = (getattr(response, "output_text", "") or "").strip()
        if not result:
            return {"success": False, "msg": "Empty response from model."}
        return {"success": True, "result": result}
    except Exception as e:
        trade_logger.error(f"Chain analysis error: {e}")
        return {"success": False, "msg": f"Chain analysis failed: {e}"}

@app.websocket("/ws/logs")
async def stream_logs(websocket: WebSocket):
    await websocket.accept()
    last_index = max(0, len(BOT_STATE["logs"]) - 50)
    for msg in BOT_STATE["logs"][last_index:]:
        await websocket.send_text(msg)
    last_index = len(BOT_STATE["logs"])

    try:
        while True:
            if last_index > len(BOT_STATE["logs"]):
                last_index = 0
            if last_index < len(BOT_STATE["logs"]):
                new_logs = BOT_STATE["logs"][last_index:]
                last_index = len(BOT_STATE["logs"])
                for msg in new_logs:
                    await websocket.send_text(msg)
            await asyncio.sleep(0.3)
    except WebSocketDisconnect:
        return
    except Exception:
        try:
            await websocket.close()
        except Exception:
            pass

@app.post("/start")
def start_bot(config: BotConfig):
    if BOT_STATE["is_running"]:
        return {"success": False, "msg": "이미 실행 중입니다."}
    
    network_error = validate_symbol_network(config)
    if network_error:
        return {"success": False, "msg": network_error}

    BOT_STATE["logs"] = [] # 로그 초기화
    reset_progress()
    BOT_STATE["status_msg"] = "실행 준비"
    
    # 서버 응답성을 위해 별도 스레드에서 로직 실행
    t = threading.Thread(target=run_trading_logic, args=(config,))
    t.daemon = True
    t.start()
    
    return {"success": True, "msg": "봇 시작됨"}

@app.post("/stop")
def stop_bot():
    BOT_STATE["is_running"] = False # 로직 내부에서 이 값을 보고 멈춤
    BOT_STATE["status_msg"] = "중단 요청됨"
    return {"success": True, "msg": "중단 요청됨"}

if __name__ == "__main__":
    # 실행 시 127.0.0.1:8000 포트 개방
    uvicorn.run(app, host="127.0.0.1", port=8000)
