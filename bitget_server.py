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
    "status_msg": "대기 중"
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

formatter = logging.Formatter('%(asctime)s - %(message)s')

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

# === 3. 데이터 모델 ===
class BotConfig(BaseModel):
    BITGET_API: dict
    UPBIT_ACCESS: str
    UPBIT_SECRET: str
    BITGET_USDT_ADDRESS: str
    UPBIT_SOL_ADDRESS: str
    SYMBOL_NAME: str = 'SOL'
    QTY: float = 0.11
    START_STEP: int = 1

# === 4. 매매 로직 (스레드 실행용) ===
def smart_order(exchange_name, api_context, symbol, qty, is_buy):
    # (사용자님의 smart_order 로직을 여기에 통합합니다. API 객체는 인자로 받습니다.)
    try:
        bitget = api_context['bitget']
        upbit = api_context['upbit']
        # ... 기존 주문 로직 ...
        price = 0
        if exchange_name == 'bitget':
            ticker = bitget.fetch_ticker(symbol)
            price = ticker['ask'] if is_buy else ticker['bid']
        else:
            ob = pyupbit.get_orderbook(symbol)
            price = ob['orderbook_units'][0]['ask_price'] if is_buy else ob['orderbook_units'][0]['bid_price']
        
        side = "BUY" if is_buy else "SELL"
        trade_logger.info(f"[{exchange_name}] {side} 주문 시도: {price} (수량: {qty})")
        # 실제 주문 코드는 여기에 복사... (간략화함)
        time.sleep(1)
        trade_logger.info(f"[{exchange_name}] {side} 주문 완료(시뮬레이션)")
        return True
    except Exception as e:
        trade_logger.error(f"주문 오류: {e}")
        return False

def run_trading_logic(cfg: BotConfig):
    BOT_STATE["is_running"] = True
    BOT_STATE["status_msg"] = "실행 중..."
    
    try:
        # API 객체 초기화
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

        # 주요 변수
        SYMBOL = cfg.SYMBOL_NAME
        QTY = cfg.QTY
        STEP = cfg.START_STEP
        
        logger.info(f"=== 봇 시작 (Step {STEP}) ===")

        # [단계별 로직]
        # 사용자가 'Stop'을 누르면 루프를 탈출하도록 if BOT_STATE["is_running"] 체크
        
        if STEP <= 1 and BOT_STATE["is_running"]:
            logger.info("[1] 설정: 레버리지 초기화")
            try:
                fut_sym = f"{SYMBOL}/USDT:USDT"
                bitget_future.set_leverage(1, fut_sym)
                bitget_future.set_position_mode(False, fut_sym)
            except: pass

        if STEP <= 2 and BOT_STATE["is_running"]:
            logger.info("[2] 진입: 비트겟 현물 매수")
            bg_sym = f"{SYMBOL}/USDT"
            smart_order('bitget', api_context, bg_sym, QTY, True)

        # ... (3단계 ~ 9단계 로직도 동일한 패턴으로 여기에 넣으세요) ...
        # ... time.sleep()이 있는 구간마다 BOT_STATE["is_running"] 체크 권장 ...

        logger.info("=== 모든 작업 완료 ===")

    except Exception as e:
        logger.error(f"봇 실행 중 오류: {e}")
        logger.error(traceback.format_exc())
    finally:
        BOT_STATE["is_running"] = False
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
        "logs": BOT_STATE["logs"][-50:]
    }

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
    
    BOT_STATE["logs"] = [] # 로그 초기화
    
    # 서버 응답성을 위해 별도 스레드에서 로직 실행
    t = threading.Thread(target=run_trading_logic, args=(config,))
    t.daemon = True
    t.start()
    
    return {"success": True, "msg": "봇 시작됨"}

@app.post("/stop")
def stop_bot():
    BOT_STATE["is_running"] = False # 로직 내부에서 이 값을 보고 멈춤
    return {"success": True, "msg": "중단 요청됨"}

if __name__ == "__main__":
    # 실행 시 127.0.0.1:8000 포트 개방
    uvicorn.run(app, host="127.0.0.1", port=8000)
