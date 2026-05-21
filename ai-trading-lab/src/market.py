from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request
from dataclasses import dataclass


BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines"


@dataclass(frozen=True)
class Candle:
    open_time: int
    open: float
    high: float
    low: float
    close: float
    volume: float
    close_time: int


def fetch_klines(symbol: str = "ETHUSDT", interval: str = "1m", limit: int = 300) -> list[Candle]:
    query = urllib.parse.urlencode({"symbol": symbol.upper(), "interval": interval, "limit": limit})
    request = urllib.request.Request(
        f"{BINANCE_KLINES_URL}?{query}",
        headers={"User-Agent": "ai-trading-lab/0.1"},
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        rows = json.loads(response.read().decode("utf-8"))

    candles: list[Candle] = []
    for row in rows:
        candles.append(
            Candle(
                open_time=int(row[0]),
                open=float(row[1]),
                high=float(row[2]),
                low=float(row[3]),
                close=float(row[4]),
                volume=float(row[5]),
                close_time=int(row[6]),
            )
        )
    return candles


def synthetic_candles(limit: int = 300, start_price: float = 3000.0) -> list[Candle]:
    candles: list[Candle] = []
    price = start_price
    now = int(time.time() * 1000) - limit * 60_000
    for i in range(limit):
        drift = ((i % 17) - 8) * 0.00035
        wave = ((i % 29) - 14) * 0.00018
        open_price = price
        close = max(1.0, price * (1 + drift + wave))
        high = max(open_price, close) * 1.0015
        low = min(open_price, close) * 0.9985
        volume = 1000 + (i % 37) * 40
        candles.append(
            Candle(
                open_time=now + i * 60_000,
                open=open_price,
                high=high,
                low=low,
                close=close,
                volume=volume,
                close_time=now + (i + 1) * 60_000 - 1,
            )
        )
        price = close
    return candles

