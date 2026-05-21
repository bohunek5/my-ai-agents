from __future__ import annotations

import hashlib
import random
from dataclasses import dataclass

from market import Candle


Signal = str


@dataclass
class Agent:
    name: str
    family: str
    lookback: int
    threshold: float
    risk: float
    weight: float
    pnl: float = 0.0
    wins: int = 0
    losses: int = 0
    last_signal: Signal = "HOLD"

    def decide(self, candles: list[Candle], index: int) -> Signal:
        if index < max(3, self.lookback):
            self.last_signal = "HOLD"
            return self.last_signal

        window = candles[index - self.lookback : index + 1]
        closes = [c.close for c in window]
        volumes = [c.volume for c in window]
        change = (closes[-1] - closes[0]) / closes[0]
        short_change = (closes[-1] - closes[-min(4, len(closes))]) / closes[-min(4, len(closes))]
        avg = sum(closes) / len(closes)
        vol_ratio = volumes[-1] / max(1.0, sum(volumes[:-1]) / max(1, len(volumes) - 1))

        if self.family == "momentum":
            signal = "BUY" if change > self.threshold else "SELL" if change < -self.threshold else "HOLD"
        elif self.family == "mean_reversion":
            distance = (closes[-1] - avg) / avg
            signal = "SELL" if distance > self.threshold else "BUY" if distance < -self.threshold else "HOLD"
        elif self.family == "breakout":
            prior_high = max(c.high for c in window[:-1])
            prior_low = min(c.low for c in window[:-1])
            signal = "BUY" if closes[-1] > prior_high else "SELL" if closes[-1] < prior_low else "HOLD"
        elif self.family == "volume":
            signal = "BUY" if vol_ratio > 1.25 and short_change > 0 else "SELL" if vol_ratio > 1.25 and short_change < 0 else "HOLD"
        elif self.family == "lstm_proxy":
            # Lightweight local proxy for a sequence model. Replace with a real model later.
            slope = sum((i + 1) * (closes[i] - avg) for i in range(len(closes))) / len(closes)
            signal = "BUY" if slope > avg * self.threshold else "SELL" if slope < -avg * self.threshold else "HOLD"
        else:
            signal = "HOLD"

        self.last_signal = signal
        return signal


def build_agents(count: int = 100, seed: str = "ETHUSDT") -> list[Agent]:
    digest = hashlib.sha256(seed.encode("utf-8")).hexdigest()
    rng = random.Random(int(digest[:10], 16))
    families = ["momentum", "mean_reversion", "breakout", "volume", "lstm_proxy"]
    agents: list[Agent] = []
    for i in range(count):
        family = families[i % len(families)]
        lookback = rng.randint(8, 60)
        threshold = rng.uniform(0.0008, 0.008)
        risk = rng.uniform(0.25, 1.25)
        weight = rng.uniform(0.5, 1.5)
        agents.append(
            Agent(
                name=f"{family.upper()}-{i + 1:03d}",
                family=family,
                lookback=lookback,
                threshold=threshold,
                risk=risk,
                weight=weight,
            )
        )
    return agents

