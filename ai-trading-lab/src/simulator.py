from __future__ import annotations

from dataclasses import dataclass

from agents import Agent
from market import Candle


@dataclass
class SwarmState:
    symbol: str
    interval: str
    last_price: float
    price_change_pct: float
    high_price: float
    low_price: float
    volume: float
    votes: dict[str, int]
    weighted_score: float
    consensus: str
    top_agents: list[Agent]
    family_stats: dict[str, dict[str, float | int]]
    balance: float
    starting_balance: float
    trade_count: int
    win_rate: float


def consensus_from_score(score: float) -> str:
    if score > 0.18:
        return "BUY"
    if score < -0.18:
        return "SELL"
    return "HOLD"


def run_paper_simulation(
    symbol: str,
    interval: str,
    candles: list[Candle],
    agents: list[Agent],
    starting_balance: float = 10_000.0,
) -> SwarmState:
    balance = starting_balance
    trade_count = 0
    win_count = 0
    votes = {"BUY": 0, "SELL": 0, "HOLD": 0}

    for index in range(len(candles) - 1):
        current = candles[index]
        nxt = candles[index + 1]
        move = (nxt.close - current.close) / current.close
        for agent in agents:
            signal = agent.decide(candles, index)
            if signal == "HOLD":
                continue
            direction = 1 if signal == "BUY" else -1
            result = direction * move * agent.risk * 100
            agent.pnl += result
            trade_count += 1
            if result >= 0:
                agent.wins += 1
                win_count += 1
            else:
                agent.losses += 1
            balance += result

    weighted = 0.0
    total_weight = 0.0
    last_index = len(candles) - 1
    for agent in agents:
        signal = agent.decide(candles, last_index)
        votes[signal] += 1
        value = 1 if signal == "BUY" else -1 if signal == "SELL" else 0
        score_weight = max(0.2, agent.weight + agent.pnl / 100)
        weighted += value * score_weight
        total_weight += score_weight

    score = weighted / total_weight if total_weight else 0.0
    top = sorted(agents, key=lambda a: a.pnl, reverse=True)[:12]
    family_stats: dict[str, dict[str, float | int]] = {}
    for agent in agents:
        row = family_stats.setdefault(
            agent.family,
            {"agents": 0, "pnl": 0.0, "wins": 0, "losses": 0, "buy": 0, "sell": 0, "hold": 0},
        )
        row["agents"] += 1
        row["pnl"] += agent.pnl
        row["wins"] += agent.wins
        row["losses"] += agent.losses
        row[agent.last_signal.lower()] += 1

    first_price = candles[0].close
    last_price = candles[-1].close
    return SwarmState(
        symbol=symbol,
        interval=interval,
        last_price=last_price,
        price_change_pct=((last_price - first_price) / first_price) * 100 if first_price else 0.0,
        high_price=max(c.high for c in candles),
        low_price=min(c.low for c in candles),
        volume=sum(c.volume for c in candles),
        votes=votes,
        weighted_score=score,
        consensus=consensus_from_score(score),
        top_agents=top,
        family_stats=family_stats,
        balance=balance,
        starting_balance=starting_balance,
        trade_count=trade_count,
        win_rate=(win_count / trade_count) * 100 if trade_count else 0.0,
    )
