#!/usr/bin/env python3
from __future__ import annotations

import argparse
import base64
import http.server
import os
import socketserver
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
sys.path.insert(0, str(SRC))

from agents import build_agents
from dashboard import render_dashboard
from market import fetch_klines, synthetic_candles
from simulator import run_paper_simulation


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="KTrade Market Intelligence dashboard.")
    parser.add_argument("--symbol", default="ETHUSDT")
    parser.add_argument("--interval", default="1m")
    parser.add_argument("--agents", type=int, default=100)
    parser.add_argument("--limit", type=int, default=300)
    parser.add_argument("--balance", type=float, default=10_000.0)
    parser.add_argument("--offline", action="store_true", help="Use synthetic candles instead of Binance public candles.")
    parser.add_argument("--serve", action="store_true", help="Serve reports/latest.html at http://127.0.0.1:8765.")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--user", default="KTrade")
    parser.add_argument("--password", default="KTrade2026")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.offline:
        candles = synthetic_candles(args.limit)
    else:
        try:
            candles = fetch_klines(args.symbol, args.interval, args.limit)
        except Exception as exc:
            print(f"Market fetch failed, using synthetic data: {exc}")
            candles = synthetic_candles(args.limit)

    agents = build_agents(args.agents, seed=args.symbol)
    state = run_paper_simulation(args.symbol, args.interval, candles, agents, args.balance)
    output = ROOT / "reports" / "latest.html"
    render_dashboard(state, candles, output)

    print(f"SYMBOL: {state.symbol}")
    print(f"CONSENSUS: {state.consensus}")
    print(f"PRICE: {state.last_price:.2f}")
    print(f"VOTES: {state.votes}")
    print(f"DASHBOARD: {output}")

    if args.serve:
        os.chdir(output.parent)
        expected = "Basic " + base64.b64encode(f"{args.user}:{args.password}".encode("utf-8")).decode("ascii")

        class AuthHandler(http.server.SimpleHTTPRequestHandler):
            def do_GET(self) -> None:
                if self.headers.get("Authorization") != expected:
                    self.send_response(401)
                    self.send_header("WWW-Authenticate", 'Basic realm="KTrade Market Intelligence"')
                    self.send_header("Content-Type", "text/plain; charset=utf-8")
                    self.end_headers()
                    self.wfile.write("Login required.".encode("utf-8"))
                    return
                super().do_GET()

            def do_HEAD(self) -> None:
                if self.headers.get("Authorization") != expected:
                    self.send_response(401)
                    self.send_header("WWW-Authenticate", 'Basic realm="KTrade Market Intelligence"')
                    self.end_headers()
                    return
                super().do_HEAD()

        class ThreadedServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
            allow_reuse_address = True
            daemon_threads = True

        handler = AuthHandler
        with ThreadedServer(("127.0.0.1", args.port), handler) as httpd:
            print(f"URL: http://127.0.0.1:{args.port}/latest.html")
            print(f"LOGIN: {args.user}")
            httpd.serve_forever()


if __name__ == "__main__":
    main()
