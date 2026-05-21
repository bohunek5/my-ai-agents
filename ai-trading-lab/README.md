# KTrade Market Intelligence

Local market-intelligence dashboard for showing how an AI-assisted trading
analysis platform can work in demo mode.

The platform does not place real exchange orders. It reads public market
candles, runs multiple strategy models, scores their signals, and writes a
secured local HTML dashboard.

## Quick Start

```bash
cd /Users/karolbohdanowicz/my-ai-agents/ai-trading-lab
python3 run_paper.py --symbol ETHUSDT --interval 1m --agents 100 --limit 300 --serve
```

Then open:

```text
http://127.0.0.1:8765/latest.html
```

Login:

```text
KTrade
```

Password:

```text
KTrade2026
```

## What The Dashboard Shows

- instrument name and market type, for example `ETH / USDT` on `Crypto Spot`,
- public market price, session range, volume, and refresh status,
- decision signal: `BUY`, `SELL`, or `HOLD`,
- virtual portfolio result,
- signal distribution across strategy models,
- strategy modules such as Momentum Desk, Breakout Desk, Volume Desk, and Sequence AI Desk,
- best models from the current analytical session.

## Safety

This is a demo and analytics environment only. Live trading would require
separate exchange-key handling, order execution, risk limits, position sizing,
audit logs, alerts, and a manual kill switch.
