import ccxt
import pyupbit
import time
import math
import logging
import traceback
import os
import sys
import jwt
import uuid
import hashlib
from urllib.parse import urlencode
import requests

# ==========================================
# [사용자 입력 란] 정보를 정확히 입력하세요
# ==========================================

# 1. API 키 설정
# 비트겟_API_KEY
BITGET_API = {
    'apiKey': '',
    'secret': '',
    'password': '',
    'enableRateLimit': True,
    'options': {'defaultType': 'spot'} # 기본 현물 설정
}

# 업비트_API_KEY
UPBIT_ACCESS = ""
UPBIT_SECRET = ""

# 2. 지갑 주소 설정 (오입력 시 자산 증발 주의)
# 비트겟 USDT 주소 (TRC20 필수)
BITGET_USDT_ADDRESS = ""

# 업비트 코인(심볼) 주소
UPBIT_SOL_ADDRESS = "" 

# 업비트 코인(심볼) 종류
SYMBOL_NAME = 'SOL'

# 주문 수량
QTY = 0.11

# ==========================================
# [로그 설정]
if not os.path.exists('./log'):
    os.makedirs('./log')

logger = logging.getLogger()
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s', datefmt='%y-%m-%d %H:%M:%S')

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

file_handler = logging.FileHandler('./log/arbitrage.log', encoding='utf-8')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
# ==========================================

bitget = ccxt.bitget(BITGET_API)
bitget_future = ccxt.bitget(BITGET_API)
bitget_future.options['defaultType'] = 'swap'
upbit = pyupbit.Upbit(UPBIT_ACCESS, UPBIT_SECRET)

def get_start_step():
    """커맨드 라인 인자(--1 ~ --9)를 파싱하여 시작 단계를 반환"""
    start_step = 1
    # sys.argv에 --숫자 형식이 있는지 확인
    for arg in sys.argv:
        if arg.startswith('--') and arg[2:].isdigit():
            step = int(arg[2:])
            if 1 <= step <= 9:
                return step
    return start_step

def smart_order(exchange_name, order_type, symbol, qty, is_buy):
    attempt = 1
    while True:
        try:
            price = 0
            if exchange_name == 'bitget':
                ticker = bitget.fetch_ticker(symbol)
                price = ticker['ask'] if is_buy else ticker['bid']
            else: # upbit
                ob = pyupbit.get_orderbook(symbol)
                price = ob['orderbook_units'][0]['ask_price'] if is_buy else ob['orderbook_units'][0]['bid_price']

            logger.info(f" -> [{attempt}회차] {'매수' if is_buy else '매도'} 시도: {price} (수량: {qty})")

            order_id = None
            if exchange_name == 'bitget':
                if is_buy: order = bitget.create_limit_buy_order(symbol, qty, price)
                else: order = bitget.create_limit_sell_order(symbol, qty, price)
                order_id = order['id']
            else: # upbit
                if is_buy: res = upbit.buy_limit_order(symbol, price, qty)
                else: res = upbit.sell_limit_order(symbol, price, qty)
                if 'uuid' not in res:
                    time.sleep(1)
                    continue
                order_id = res['uuid']

            is_filled = False
            for _ in range(5):
                time.sleep(1)
                status = ''
                if exchange_name == 'bitget':
                    status = bitget.fetch_order(order_id, symbol)['status']
                else:
                    status = upbit.get_order(order_id).get('state')
                
                if status in ['closed', 'done']:
                    is_filled = True
                    break
            
            if is_filled:
                logger.info(f" -> [체결 완료] {exchange_name} 주문 성공")
                return True
            else:
                logger.info(" -> 미체결: 취소 후 갱신")
                if exchange_name == 'bitget':
                    try: bitget.cancel_order(order_id, symbol)
                    except: pass
                else:
                    upbit.cancel_order(order_id)
                time.sleep(0.5)
                attempt += 1
        except Exception as e:
            logger.error(f"스마트 주문 중 에러: {e}")
            time.sleep(1)

def main():
    START_STEP = get_start_step()
    logger.info(f"=== [Arbitrage Bot] 시작 단계: {START_STEP} ===")
    
    fut_symbol = f"{SYMBOL_NAME}/USDT:USDT"
    bg_symbol = f"{SYMBOL_NAME}/USDT"
    up_symbol = f"KRW-{SYMBOL_NAME}"
    up_usdt_symbol = "KRW-USDT"
    
    # 전송 수량 (중간 시작 시 0일 수 있음)
    tx_qty = 0 

    # ------------------------------------------------
    # [1] 설정
    # ------------------------------------------------
    if START_STEP <= 1:
        logger.info("\n[1] 설정: 비트겟 안전장치 가동")
        try:
            bitget_future.set_leverage(1, fut_symbol)
            bitget_future.set_position_mode(False, fut_symbol)
        except: pass

    # ------------------------------------------------
    # [2] 진입 (매수)
    # ------------------------------------------------
    if START_STEP <= 2:
        logger.info("\n[2] 진입: 비트겟 현물 스마트 매수")
        bal = bitget.fetch_balance()
        if bal['total'].get(SYMBOL_NAME, 0) >= QTY * 0.9:
            logger.info(" -> [Skip] 이미 보유 중입니다.")
        else:
            smart_order('bitget', 'limit', bg_symbol, QTY, True)

    # ------------------------------------------------
    # [3] 방어 (헷징)
    # ------------------------------------------------
    if START_STEP <= 3:
        logger.info("\n[3] 방어: 비트겟 선물 숏 헷징")
        try:
            bitget_future.create_market_sell_order(fut_symbol, QTY)
            logger.info(" -> 숏 포지션 진입 완료")
        except Exception as e:
            logger.critical(f"숏 진입 실패: {e}")
            return

    # ------------------------------------------------
    # [4] 이동 (전송)
    # ------------------------------------------------
    if START_STEP <= 4:
        logger.info("\n[4] 이동: 비트겟 -> 업비트 전송")
        try:
            bal = bitget.fetch_balance()
            avail = bal['free'].get(SYMBOL_NAME, 0)
            tx_qty = math.floor(avail * 10000) / 10000
            
            if tx_qty < 0.05:
                logger.error(" -> 잔액 부족으로 중단")
                return

            bitget.withdraw(SYMBOL_NAME, tx_qty, UPBIT_SOL_ADDRESS, params={'network': 'SOL'})
            logger.info(f" -> 출금 요청 완료 ({tx_qty} SOL)")
        except Exception as e:
            logger.error(f"전송 실패: {e}")
            return

    # ------------------------------------------------
    # [5] 검증 (입금 대기)
    # ------------------------------------------------
    if START_STEP <= 5:
        logger.info("\n[5] 검증: 업비트 입금 확인 대기")
        
        # 중간 시작으로 tx_qty를 모르는 경우 체크
        if START_STEP == 5 and tx_qty == 0:
            logger.warning(" -> 5단계부터 바로 시작하여 전송량을 모릅니다. 입금 확인 로직을 건너뜁니다.")
        else:
            start_bal = upbit.get_balance(up_symbol)
            # 수수료 고려 95% 이상
            target_bal = start_bal + (tx_qty * 0.9)
            
            logger.info(f" -> 검증 시작 | 시작 잔고: {start_bal} | 목표 잔고: {target_bal}")

            while True:
                curr = upbit.get_balance(up_symbol)
                # [개선] 점 대신 실제 수치를 출력하여 원인 파악
                if curr >= target_bal:
                    logger.info(f" -> [확인 완료] 현재 잔고: {curr} >= 목표: {target_bal}")
                    break
                else:
                    logger.info(f" -> 대기중... 현재: {curr} / 목표: {target_bal} (부족량: {target_bal - curr:.4f})")
                    time.sleep(10)

    # ------------------------------------------------
    # [6] 청산 (업비트 매도)
    # ------------------------------------------------
    if START_STEP <= 6:
        logger.info("\n[6] 청산: 업비트 SOL 매도 (현금화)")
        # 현재 보유한 전량 매도
        sell_qty = upbit.get_balance(up_symbol)
        logger.info(f" -> 현재 잔고 조회 결과: {sell_qty} SOL")
        
        if sell_qty > 0.0001:
            smart_order('upbit', 'limit', up_symbol, sell_qty, False)
        else:
            logger.warning(" -> 매도할 잔고가 없습니다. (이미 팔렸거나 입금 안됨)")

    # ------------------------------------------------
    # [7] 종료 (숏 정리)
    # ------------------------------------------------
    if START_STEP <= 7:
        logger.info("\n[7] 종료: 비트겟 숏 포지션 정리")
        try:
            bitget_future.create_market_buy_order(fut_symbol, QTY, params={'reduceOnly': True})
            logger.info(" -> 숏 포지션 종료 완료")
        except Exception as e:
            logger.error(f"숏 종료 실패 (수동 확인 필요): {e}")

    # ------------------------------------------------
    # [8] 환전 (KRW -> USDT)
    # ------------------------------------------------
    if START_STEP <= 8:
        logger.info("\n[8] 환전: KRW -> USDT 재매수")
        time.sleep(2)
        
        krw_bal = upbit.get_balance("KRW")
        use_krw = krw_bal * 0.999
        
        ob = pyupbit.get_orderbook(up_usdt_symbol)
        curr_price = ob['orderbook_units'][0]['ask_price']
        # 소수점 4자리 버림
        buy_usdt_qty = math.floor((use_krw / curr_price) * 10000) / 10000
        
        if use_krw > 5000:
            logger.info(f" -> 환전 시도: {int(use_krw)}원 (약 {buy_usdt_qty} USDT)")
            smart_order('upbit', 'limit', up_usdt_symbol, buy_usdt_qty, True)
        else:
            logger.warning(" -> KRW 잔액 부족으로 환전 스킵")

    # ------------------------------------------------
    # [9] 회수 (전송) - 직접 API 요청 방식 (net_type 포함)
    # ------------------------------------------------
    if START_STEP <= 9:
        logger.info("\n[9] 회수: USDT -> 비트겟 전송 (TRC20)")
        time.sleep(2)
        
        # 1. 잔고 조회 및 수량 계산
        usdt_bal = upbit.get_balance(up_usdt_symbol)
        raw_qty = usdt_bal - 1.5
        send_qty = math.floor(raw_qty * 100) / 100 # 소수점 2자리
        
        if send_qty <= 0:
            logger.warning(" -> 보낼 USDT 잔액이 부족합니다.")
            return

        logger.info(f" -> 전송 시도: {send_qty} USDT -> {BITGET_USDT_ADDRESS}")

        # ---------------------------------------------------------
        # [핵심] pyupbit 대신 직접 요청을 만들어 net_type을 포함시킴
        # ---------------------------------------------------------
        try:
            # 1. 요청 파라미터 (공식 문서 규격 준수)
            payload = {
                'currency': 'USDT',
                'net_type': 'TRX',  # ★★★ 이게 핵심입니다! (트론 네트워크 지정)
                'amount': str(send_qty),
                'address': BITGET_USDT_ADDRESS,
                'transaction_type': 'default' # 일반 출금
            }
            
            # 2. JWT 토큰 생성 (업비트 보안 인증)
            query_string = urlencode(payload).encode()
            m = hashlib.sha512()
            m.update(query_string)
            query_hash = m.hexdigest()

            payload_jwt = {
                'access_key': UPBIT_ACCESS,
                'nonce': str(uuid.uuid4()),
                'query_hash': query_hash,
                'query_hash_alg': 'SHA512',
            }
            jwt_token = jwt.encode(payload_jwt, UPBIT_SECRET, algorithm='HS256')
            authorize_token = 'Bearer {}'.format(jwt_token)
            headers = {"Authorization": authorize_token}

            # 3. POST 요청 전송
            res = requests.post("https://api.upbit.com/v1/withdraws/coin", json=payload, headers=headers)
            result = res.json()

            # 4. 결과 확인
            if 'uuid' in result:
                logger.info(f" -> [성공] 출금 신청 완료! (UUID: {result['uuid']})")
            else:
                # 에러 메시지 상세 출력
                logger.error(f" -> 송금 요청 실패: {result}")
                
        except Exception as e:
            logger.error(f" -> 송금 중 에러 발생: {e}")
            logger.error(traceback.format_exc())

    logger.info("\n=== 프로세스 종료 ===")

if __name__ == "__main__":
    main()