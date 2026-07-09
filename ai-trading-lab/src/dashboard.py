from __future__ import annotations

import datetime as dt
import html
from pathlib import Path

from market import Candle
from simulator import SwarmState


REFRESH_SECONDS = 30


def _fmt(value: float, digits: int = 2) -> str:
    return f"{value:,.{digits}f}".replace(",", " ")


def _pct(value: float) -> str:
    sign = "+" if value >= 0 else ""
    return f"{sign}{value:.2f}%"


def _spark_points(values: list[float], width: int = 1000, height: int = 260, pad: int = 22) -> str:
    minimum = min(values)
    maximum = max(values)
    spread = max(maximum - minimum, 1.0)
    points = []
    for i, value in enumerate(values):
        x = i * (width / max(1, len(values) - 1))
        y = height - pad - ((value - minimum) / spread) * (height - pad * 2)
        points.append(f"{x:.1f},{y:.1f}")
    return " ".join(points)


def _instrument_profile(symbol: str) -> tuple[str, str, str]:
    symbol = symbol.upper()
    if symbol.endswith("USDT"):
        base = symbol.removesuffix("USDT")
        return f"{base} / USDT", "Crypto Spot", "Binance public market data"
    if symbol.endswith("USD"):
        base = symbol.removesuffix("USD")
        return f"{base} / USD", "Crypto / FX", "Public market data"
    return symbol, "Instrument rynkowy", "Public market data"


def _family_label(family: str) -> str:
    labels = {
        "momentum": "Momentum Desk",
        "mean_reversion": "Mean Reversion Desk",
        "breakout": "Breakout Desk",
        "volume": "Volume Desk",
        "lstm_proxy": "Sequence AI Desk",
    }
    return labels.get(family, family.replace("_", " ").title())


def render_dashboard(state: SwarmState, candles: list[Candle], output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    instrument_name, market_type, data_source = _instrument_profile(state.symbol)
    closes = [c.close for c in candles[-120:]]
    volumes = [c.volume for c in candles[-48:]]
    points = _spark_points(closes)
    pnl = state.balance - state.starting_balance
    pnl_pct = (pnl / state.starting_balance) * 100 if state.starting_balance else 0.0
    vote_total = max(sum(state.votes.values()), 1)
    buy_pct = state.votes.get("BUY", 0) / vote_total * 100
    sell_pct = state.votes.get("SELL", 0) / vote_total * 100
    hold_pct = state.votes.get("HOLD", 0) / vote_total * 100
    signal_strength = min(abs(state.weighted_score) * 100, 100)
    generated = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    signal_color = "#22c55e" if state.consensus == "BUY" else "#ef4444" if state.consensus == "SELL" else "#f59e0b"
    pnl_color = "#22c55e" if pnl >= 0 else "#ef4444"
    change_color = "#22c55e" if state.price_change_pct >= 0 else "#ef4444"

    max_volume = max(max(volumes), 1)
    volume_bars = "".join(
        f'<i style="height:{max(5, volume / max_volume * 72):.1f}px"></i>'
        for volume in volumes
    )

    vote_rows = "".join(
        f"""
        <tr>
          <td>{signal}</td>
          <td>{count}</td>
          <td><span class="bar"><i style="width:{count / vote_total * 100:.1f}%"></i></span></td>
        </tr>
        """
        for signal, count in state.votes.items()
    )

    family_rows = "".join(
        f"""
        <tr>
          <td>{html.escape(_family_label(family))}</td>
          <td>{int(stats["agents"])}</td>
          <td>{_fmt(float(stats["pnl"]))}</td>
          <td>{int(stats["buy"])}/{int(stats["sell"])}/{int(stats["hold"])}</td>
          <td>{(int(stats["wins"]) / max(1, int(stats["wins"]) + int(stats["losses"])) * 100):.1f}%</td>
        </tr>
        """
        for family, stats in sorted(state.family_stats.items(), key=lambda item: float(item[1]["pnl"]), reverse=True)
    )

    agent_rows = "".join(
        f"""
        <tr>
          <td><b>{html.escape(agent.name)}</b></td>
          <td>{html.escape(_family_label(agent.family))}</td>
          <td><span class="chip {agent.last_signal.lower()}">{agent.last_signal}</span></td>
          <td>{_fmt(agent.pnl)}</td>
          <td>{agent.wins}/{agent.losses}</td>
        </tr>
        """
        for agent in state.top_agents
    )

    output.write_text(
        f"""<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>KTrade Market Intelligence - {html.escape(state.symbol)}</title>
<style>
  :root {{
    --bg:#08111f; --panel:#101a2d; --panel2:#0d1627; --border:#25344f;
    --text:#e5e7eb; --muted:#94a3b8; --blue:#38bdf8; --green:#22c55e;
    --amber:#f59e0b; --red:#ef4444; --white:#fff;
  }}
  * {{ box-sizing:border-box; }}
  body {{
    margin:0; min-height:100vh; color:var(--text);
    font-family:Arial,Helvetica,sans-serif;
    background:
      radial-gradient(circle at 18% -10%, rgba(56,189,248,.22), transparent 34%),
      linear-gradient(135deg, #08111f 0%, #0f172a 56%, #111827 100%);
  }}
  .wrap {{ max-width:1360px; margin:0 auto; padding:22px; }}
  header {{ display:flex; justify-content:space-between; gap:16px; align-items:flex-start; margin-bottom:18px; }}
  h1 {{ margin:0; font-size:28px; letter-spacing:0; }}
  .lead {{ margin:6px 0 0; color:var(--muted); font-size:13px; }}
  .status {{ display:flex; gap:8px; align-items:center; color:var(--muted); font-size:12px; white-space:nowrap; }}
  .dot {{ width:10px; height:10px; border-radius:50%; background:var(--green); box-shadow:0 0 18px var(--green); animation:pulse 1.6s infinite; }}
  .grid {{ display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:12px; }}
  .card, .panel {{
    background:linear-gradient(180deg, rgba(16,26,45,.96), rgba(13,22,39,.96));
    border:1px solid var(--border); border-radius:8px; box-shadow:0 18px 42px rgba(0,0,0,.18);
  }}
  .card {{ min-height:98px; padding:14px; position:relative; overflow:hidden; }}
  .card::after {{ content:""; position:absolute; inset:auto -30px -44px auto; width:100px; height:100px; border:1px solid rgba(56,189,248,.14); border-radius:50%; }}
  .label {{ display:block; color:var(--muted); font-size:11px; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }}
  .value {{ display:block; font-size:25px; color:var(--white); font-weight:700; line-height:1.05; }}
  .mini {{ display:block; color:var(--muted); font-size:12px; margin-top:9px; }}
  .signal {{ color:{signal_color}; }}
  .pnl {{ color:{pnl_color}; }}
  .change {{ color:{change_color}; }}
  .main {{ display:grid; grid-template-columns:minmax(0,1.6fr) minmax(360px,.8fr); gap:12px; }}
  .panel {{ padding:16px; min-width:0; }}
  .panel h2 {{ margin:0 0 12px; font-size:16px; }}
  .chartbox {{ position:relative; height:340px; }}
  svg {{ width:100%; height:100%; display:block; background:#091222; border:1px solid var(--border); border-radius:8px; }}
  .line {{ fill:none; stroke:var(--blue); stroke-width:3.5; stroke-linecap:round; filter:drop-shadow(0 0 10px rgba(56,189,248,.38)); stroke-dasharray:1800; stroke-dashoffset:1800; animation:draw 1.5s ease-out forwards; }}
  .fill {{ fill:url(#area); opacity:.72; }}
  .metric-row {{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-top:12px; }}
  .metric {{ background:#0b1424; border:1px solid var(--border); border-radius:8px; padding:12px; }}
  .meter {{ height:14px; border-radius:99px; overflow:hidden; display:flex; background:#0b1424; border:1px solid var(--border); margin:12px 0; }}
  .meter .buy {{ width:{buy_pct:.1f}%; background:var(--green); }}
  .meter .hold {{ width:{hold_pct:.1f}%; background:var(--amber); }}
  .meter .sell {{ width:{sell_pct:.1f}%; background:var(--red); }}
  .strength {{ margin-top:12px; height:9px; border-radius:99px; background:#0b1424; overflow:hidden; border:1px solid var(--border); }}
  .strength i {{ display:block; height:100%; width:{signal_strength:.1f}%; background:{signal_color}; box-shadow:0 0 18px {signal_color}; transition:width .4s ease; }}
  .volumes {{ display:flex; align-items:flex-end; gap:3px; height:84px; margin-top:16px; padding:8px; background:#0b1424; border:1px solid var(--border); border-radius:8px; }}
  .volumes i {{ flex:1; min-width:2px; background:linear-gradient(180deg, var(--blue), rgba(56,189,248,.22)); border-radius:2px 2px 0 0; animation:rise .8s ease-out both; }}
  table {{ width:100%; border-collapse:collapse; table-layout:fixed; }}
  th, td {{ border-bottom:1px solid var(--border); padding:10px 8px; text-align:left; font-size:13px; vertical-align:middle; }}
  th {{ color:var(--muted); text-transform:uppercase; font-size:10px; letter-spacing:.06em; font-weight:700; }}
  tr:hover td {{ background:rgba(56,189,248,.04); }}
  .tables {{ display:grid; grid-template-columns:minmax(340px,.8fr) minmax(0,1.2fr); gap:12px; margin-top:12px; }}
  .bar {{ display:block; width:100%; height:8px; background:#0b1424; border:1px solid var(--border); border-radius:99px; overflow:hidden; }}
  .bar i {{ display:block; height:100%; background:var(--blue); }}
  .chip {{ display:inline-flex; align-items:center; justify-content:center; min-width:58px; height:24px; border-radius:99px; font-size:11px; font-weight:700; }}
  .chip.buy {{ color:#052e16; background:var(--green); }}
  .chip.sell {{ color:#450a0a; background:var(--red); }}
  .chip.hold {{ color:#451a03; background:var(--amber); }}
  .foot {{ margin:14px 0 0; color:var(--muted); font-size:12px; line-height:1.45; }}
  @keyframes draw {{ to {{ stroke-dashoffset:0; }} }}
  @keyframes pulse {{ 0%,100% {{ opacity:.65; transform:scale(.96); }} 50% {{ opacity:1; transform:scale(1.1); }} }}
  @keyframes rise {{ from {{ transform:scaleY(.25); opacity:.35; }} to {{ transform:scaleY(1); opacity:1; }} }}
  @media(max-width:1100px) {{ .grid {{ grid-template-columns:repeat(3,1fr); }} .main,.tables {{ grid-template-columns:1fr; }} }}
  @media(max-width:700px) {{ .wrap {{ padding:14px; }} header {{ display:block; }} .status {{ margin-top:10px; }} .grid,.metric-row {{ grid-template-columns:1fr; }} h1 {{ font-size:23px; }} }}
</style>
</head>
<body>
<main class="wrap">
  <header>
    <div>
      <h1>KTrade Market Intelligence</h1>
      <p class="lead">{html.escape(instrument_name)} · {html.escape(market_type)} · {html.escape(data_source)} · interwał {html.escape(state.interval)}</p>
    </div>
    <div class="status"><span class="dot"></span><span>Market feed online</span><span>odświeżenie za <b id="count">{REFRESH_SECONDS}</b>s</span></div>
  </header>

  <section class="grid">
    <div class="card"><span class="label">Sygnał decyzyjny</span><span class="value signal">{state.consensus}</span><span class="mini">pewność modelu {_fmt(signal_strength, 1)}%</span></div>
    <div class="card"><span class="label">Instrument</span><span class="value">{html.escape(instrument_name)}</span><span class="mini">{html.escape(market_type)}</span></div>
    <div class="card"><span class="label">Ostatnia cena</span><span class="value">{_fmt(state.last_price)}</span><span class="mini change">{_pct(state.price_change_pct)} w analizowanej próbie</span></div>
    <div class="card"><span class="label">Wynik portfela testowego</span><span class="value pnl">{_fmt(pnl)}</span><span class="mini pnl">{_pct(pnl_pct)} od startu sesji</span></div>
    <div class="card"><span class="label">Portfel wirtualny</span><span class="value">{_fmt(state.balance)}</span><span class="mini">kapitał bazowy {_fmt(state.starting_balance)}</span></div>
    <div class="card"><span class="label">Zakres sesji</span><span class="value">{_fmt(state.low_price)} - {_fmt(state.high_price)}</span><span class="mini">wolumen {_fmt(state.volume, 0)}</span></div>
  </section>

  <section class="main">
    <div class="panel">
      <h2>Wykres instrumentu</h2>
      <div class="chartbox">
        <svg viewBox="0 0 1000 260" preserveAspectRatio="none" role="img" aria-label="Wykres ceny">
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity=".32"/>
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <polygon class="fill" points="0,260 {points} 1000,260"></polygon>
          <polyline class="line" points="{points}"></polyline>
        </svg>
      </div>
      <div class="metric-row">
        <div class="metric"><span class="label">Minimum wykresu</span><span class="value">{_fmt(min(closes))}</span></div>
        <div class="metric"><span class="label">Maksimum wykresu</span><span class="value">{_fmt(max(closes))}</span></div>
        <div class="metric"><span class="label">Ostatnia aktualizacja</span><span class="value">{generated}</span></div>
      </div>
    </div>

    <div class="panel">
      <h2>Silnik sygnałów</h2>
      <div class="meter"><i class="buy"></i><i class="hold"></i><i class="sell"></i></div>
      <p class="foot">BUY {state.votes.get("BUY", 0)} | HOLD {state.votes.get("HOLD", 0)} | SELL {state.votes.get("SELL", 0)}</p>
      <div class="strength"><i></i></div>
      <p class="foot">Score ważony: {_fmt(state.weighted_score, 3)}. To syntetyczna ocena kierunku z wielu modeli strategii.</p>
      <h2 style="margin-top:20px">Aktywność rynku</h2>
      <div class="volumes">{volume_bars}</div>
    </div>
  </section>

  <section class="tables">
    <div class="panel">
      <h2>Rozkład decyzji</h2>
      <table><thead><tr><th>Sygnał</th><th>Ilość</th><th>Udział</th></tr></thead><tbody>{vote_rows}</tbody></table>
    </div>
    <div class="panel">
      <h2>Modele strategii</h2>
      <table><thead><tr><th>Moduł</th><th>Modele</th><th>Wynik</th><th>B/S/H</th><th>Skuteczność</th></tr></thead><tbody>{family_rows}</tbody></table>
    </div>
  </section>

  <section class="panel" style="margin-top:12px">
    <h2>Najlepsze modele sesji</h2>
    <table><thead><tr><th>Model</th><th>Moduł</th><th>Sygnał</th><th>Wynik</th><th>W/L</th></tr></thead><tbody>{agent_rows}</tbody></table>
  </section>

  <p class="foot">Platforma demonstracyjna i analityczna. Dane rynkowe są publiczne, portfel jest wirtualny, a system nie składa realnych zleceń i nie jest rekomendacją inwestycyjną.</p>
</main>
<script>
  let seconds = {REFRESH_SECONDS};
  const counter = document.getElementById("count");
  setInterval(() => {{
    seconds -= 1;
    if (seconds <= 0) window.location.reload();
    if (counter) counter.textContent = seconds;
  }}, 1000);
</script>
</body>
</html>
""",
        encoding="utf-8",
    )
