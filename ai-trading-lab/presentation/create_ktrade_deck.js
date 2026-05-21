const pptxgen = require("pptxgenjs");
const {
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require("./pptxgenjs_helpers/layout");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "KTrade / Prescot";
pptx.subject = "AI Trading Lab presentation";
pptx.title = "KTrade AI Trading Lab";
pptx.company = "KTrade";
pptx.lang = "pl-PL";
pptx.theme = {
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  lang: "pl-PL",
};
pptx.defineLayout({ name: "LAYOUT_WIDE", width: 13.333, height: 7.5 });

const C = {
  bg: "0F172A",
  panel: "111C33",
  panel2: "16213A",
  border: "24324D",
  text: "E5E7EB",
  muted: "94A3B8",
  blue: "38BDF8",
  green: "16A34A",
  amber: "F59E0B",
  red: "DC2626",
  white: "FFFFFF",
};

function addBg(slide, title, subtitle) {
  slide.background = { color: C.bg };
  slide.addText(title, {
    x: 0.55, y: 0.28, w: 8.5, h: 0.38,
    fontFace: "Arial", fontSize: 20, bold: true, color: C.white,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.57, y: 0.72, w: 9.2, h: 0.24,
      fontFace: "Arial", fontSize: 8.5, color: C.muted,
      margin: 0,
    });
  }
  slide.addShape(pptx.ShapeType.line, {
    x: 0.55, y: 1.05, w: 12.2, h: 0,
    line: { color: C.border, width: 1 },
  });
}

function card(slide, x, y, w, h, title, body, accent = C.blue) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: 0.08,
    fill: { color: C.panel },
    line: { color: C.border, width: 1 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: 0.08, h,
    fill: { color: accent },
    line: { color: accent },
  });
  slide.addText(title, {
    x: x + 0.18, y: y + 0.16, w: w - 0.34, h: 0.25,
    fontSize: 11, bold: true, color: C.white, margin: 0,
  });
  slide.addText(body, {
    x: x + 0.18, y: y + 0.5, w: w - 0.34, h: h - 0.62,
    fontSize: 8.4, color: C.text, breakLine: false,
    fit: "shrink", margin: 0.02,
  });
}

function pill(slide, x, y, text, color) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w: 1.72, h: 0.34,
    rectRadius: 0.08,
    fill: { color },
    line: { color },
  });
  slide.addText(text, {
    x, y: y + 0.075, w: 1.72, h: 0.14,
    align: "center", fontSize: 8.6, bold: true, color: C.white, margin: 0,
  });
}

function bulletList(slide, items, x, y, w, h, fontSize = 12) {
  slide.addText(items.map(t => ({ text: t, options: { bullet: { type: "bullet" } } })), {
    x, y, w, h,
    fontSize,
    color: C.text,
    breakLine: false,
    fit: "shrink",
    paraSpaceAfterPt: 6,
    margin: 0,
    bullet: { indent: 14 },
  });
}

function validate(slide) {
  warnIfSlideHasOverlaps(slide, pptx, { ignoreLines: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

// 1
{
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  slide.addText("KTrade", { x: 0.65, y: 0.58, w: 2.1, h: 0.34, fontSize: 18, bold: true, color: C.blue, margin: 0 });
  slide.addText("AI Trading Lab", { x: 0.65, y: 1.38, w: 7.4, h: 0.72, fontSize: 39, bold: true, color: C.white, margin: 0 });
  slide.addText("Środowisko demo: 100 agentów, ETHUSDT, dane publiczne, paper trading.", {
    x: 0.68, y: 2.22, w: 7.8, h: 0.38, fontSize: 16, color: C.text, margin: 0,
  });
  card(slide, 0.72, 3.18, 3.7, 1.25, "Co pokazujemy", "Jak platforma pobiera dane, generuje sygnały i pokazuje wynik bez składania realnych zleceń.", C.green);
  card(slide, 4.72, 3.18, 3.7, 1.25, "Status bezpieczeństwa", "Na tym etapie nie ma kluczy giełdowych, nie ma depozytu i nie ma automatycznego handlu realnymi pieniędzmi.", C.amber);
  card(slide, 8.72, 3.18, 3.7, 1.25, "Cel rozmowy", "Pokazać koncepcję i zebrać decyzje: dane, ryzyko, interfejs, kierunek rozwoju.", C.blue);
  slide.addText("Demo lokalne: http://127.0.0.1:8765/latest.html   Login: KTrade", {
    x: 0.7, y: 6.78, w: 8.6, h: 0.22, fontSize: 9, color: C.muted, margin: 0,
  });
  validate(slide);
}

// 2
{
  const slide = pptx.addSlide();
  addBg(slide, "Czy platforma pobiera dane?", "Tak. Pobiera publiczne dane rynkowe i używa ich do symulacji decyzji.");
  card(slide, 0.65, 1.45, 3.75, 1.35, "Źródło danych", "Binance Spot public API: endpoint klines. Nie wymaga loginu ani kluczy API.", C.blue);
  card(slide, 4.75, 1.45, 3.75, 1.35, "Instrument", "Domyślnie ETHUSDT, interwał 1m, ostatnie 300 świec. Parametry można zmieniać z terminala.", C.green);
  card(slide, 8.85, 1.45, 3.75, 1.35, "Fallback", "Jeżeli internet albo API nie odpowie, aplikacja generuje dane syntetyczne, żeby demo nadal działało.", C.amber);
  slide.addText("Co jest realne:", { x: 0.75, y: 3.35, w: 2.4, h: 0.25, fontSize: 14, bold: true, color: C.white, margin: 0 });
  bulletList(slide, [
    "Cena i świece pobierane z publicznego rynku.",
    "Ostatnia cena i wykres są z danych świec.",
    "Agenci liczą decyzje na tych danych."
  ], 0.85, 3.82, 5.6, 1.25, 12);
  slide.addText("Co jest symulacją:", { x: 6.8, y: 3.35, w: 2.4, h: 0.25, fontSize: 14, bold: true, color: C.white, margin: 0 });
  bulletList(slide, [
    "Nie ma realnych pozycji na giełdzie.",
    "Balance to paper balance.",
    "BUY / SELL / HOLD to sygnały testowe, nie zlecenia."
  ], 6.9, 3.82, 5.6, 1.25, 12);
  validate(slide);
}

// 3
{
  const slide = pptx.addSlide();
  addBg(slide, "Jak działa przepływ danych?", "Od publicznych świec do dashboardu z decyzją roju.");
  const y = 2.2;
  const nodes = [
    ["Binance API", "świece ETHUSDT"],
    ["Market module", "normalizacja danych"],
    ["100 agents", "strategie i głosy"],
    ["Simulator", "paper PnL i ranking"],
    ["Dashboard", "HTML + logowanie"]
  ];
  nodes.forEach((n, i) => {
    const x = 0.55 + i * 2.52;
    card(slide, x, y, 2.05, 1.05, n[0], n[1], [C.blue, C.green, C.amber, C.red, C.blue][i]);
    if (i < nodes.length - 1) {
      slide.addShape(pptx.ShapeType.rightArrow, {
        x: x + 2.05, y: y + 0.33, w: 0.38, h: 0.32,
        fill: { color: C.border },
        line: { color: C.border },
      });
    }
  });
  slide.addText("Ważne: dashboard nie ma dostępu do giełdowych pieniędzy. To jest warstwa demonstracyjna i badawcza.", {
    x: 1.0, y: 4.55, w: 11.4, h: 0.42,
    fontSize: 16, bold: true, color: C.white, align: "center", margin: 0,
  });
  validate(slide);
}

// 4
{
  const slide = pptx.addSlide();
  addBg(slide, "100 agentów: co oni robią?", "To nie jest jeden magiczny sygnał, tylko głosowanie wielu prostych strategii.");
  const families = [
    ["Momentum", "kupuje siłę trendu, sprzedaje słabość"],
    ["Mean reversion", "szuka odchylenia od średniej"],
    ["Breakout", "reaguje na wybicie zakresu"],
    ["Volume", "patrzy na wolumen i krótki ruch"],
    ["LSTM proxy", "lokalny zamiennik logiki sekwencyjnej"]
  ];
  families.forEach((f, i) => {
    const x = i < 3 ? 0.75 + i * 4.15 : 2.85 + (i - 3) * 4.15;
    const y = i < 3 ? 1.45 : 3.25;
    card(slide, x, y, 3.55, 1.25, f[0], f[1], [C.blue, C.green, C.amber, C.red, C.blue][i]);
  });
  slide.addText("Każdy agent ma inne: lookback, próg reakcji, wagę i ryzyko. Potem platforma liczy głosy oraz ranking skuteczności w symulacji.", {
    x: 1.05, y: 5.8, w: 11.2, h: 0.45, align: "center", fontSize: 14, color: C.text, margin: 0,
  });
  validate(slide);
}

// 5
{
  const slide = pptx.addSlide();
  addBg(slide, "Co widzi użytkownik?", "Dashboard lokalny z logowaniem.");
  card(slide, 0.75, 1.35, 3.0, 1.1, "Logowanie", "KTrade / KTrade2026", C.blue);
  card(slide, 3.95, 1.35, 3.0, 1.1, "Sygnał", "Consensus: BUY / SELL / HOLD", C.green);
  card(slide, 7.15, 1.35, 3.0, 1.1, "Rynek", "Last price + wykres świec", C.amber);
  card(slide, 10.35, 1.35, 2.25, 1.1, "Ranking", "Top agents", C.red);
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.85, y: 3.05, w: 11.65, h: 2.3,
    rectRadius: 0.08,
    fill: { color: "0B1220" },
    line: { color: C.border, width: 1 },
  });
  slide.addText("Przykładowy ekran", { x: 1.1, y: 3.25, w: 3, h: 0.24, fontSize: 12, bold: true, color: C.white, margin: 0 });
  pill(slide, 1.1, 3.72, "Consensus: HOLD", C.amber);
  pill(slide, 3.05, 3.72, "ETHUSDT", C.blue);
  pill(slide, 5.0, 3.72, "100 agents", C.green);
  slide.addShape(pptx.ShapeType.line, { x: 1.1, y: 4.6, w: 10.8, h: 0, line: { color: C.blue, width: 3 } });
  slide.addShape(pptx.ShapeType.line, { x: 1.1, y: 4.6, w: 1.5, h: -0.35, line: { color: C.blue, width: 3 } });
  slide.addShape(pptx.ShapeType.line, { x: 2.6, y: 4.25, w: 2.2, h: 0.45, line: { color: C.blue, width: 3 } });
  slide.addShape(pptx.ShapeType.line, { x: 4.8, y: 4.7, w: 2.5, h: -0.25, line: { color: C.blue, width: 3 } });
  slide.addShape(pptx.ShapeType.line, { x: 7.3, y: 4.45, w: 4.6, h: 0.25, line: { color: C.blue, width: 3 } });
  validate(slide);
}

// 6
{
  const slide = pptx.addSlide();
  addBg(slide, "Czego jeszcze brakuje do wersji produkcyjnej?", "To jest świadomie etap demonstracyjny.");
  bulletList(slide, [
    "Dziennik decyzji: każde wejście, wyjście, powód i wynik.",
    "Backtest na wielu dniach, tygodniach i warunkach rynku.",
    "Limity ryzyka: dzienny stop loss, maksymalna pozycja, limit strat serii.",
    "Kill switch: ręczne i automatyczne wyłączenie handlu.",
    "Oddzielenie paper tradingu od live tradingu.",
    "Dopiero na końcu: integracja z giełdą i realnymi zleceniami."
  ], 0.95, 1.55, 11.5, 3.2, 16);
  slide.addText("Wniosek dla kolegi: mamy działające demo danych i agentów. Nie udajemy, że to gotowa maszynka do zarabiania. Najpierw mierzymy jakość sygnałów.", {
    x: 1.0, y: 5.45, w: 11.4, h: 0.62, fontSize: 15, bold: true, color: C.white, align: "center", margin: 0,
  });
  validate(slide);
}

// 7
{
  const slide = pptx.addSlide();
  addBg(slide, "Jak uruchomić demo", "Komendy dla lokalnego środowiska.");
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.9, y: 1.65, w: 11.55, h: 2.0,
    rectRadius: 0.08,
    fill: { color: "0B1220" },
    line: { color: C.border, width: 1 },
  });
  slide.addText("cd /Users/karolbohdanowicz/my-ai-agents/ai-trading-lab\npython3 run_paper.py --symbol ETHUSDT --interval 1m --agents 100 --limit 300 --serve", {
    x: 1.2, y: 2.05, w: 10.9, h: 0.9,
    fontFace: "Courier New",
    fontSize: 13.5,
    color: C.green,
    breakLine: false,
    fit: "shrink",
    margin: 0,
  });
  card(slide, 1.0, 4.25, 3.3, 1.05, "Adres", "http://127.0.0.1:8765/latest.html", C.blue);
  card(slide, 5.0, 4.25, 3.3, 1.05, "Login", "KTrade", C.green);
  card(slide, 9.0, 4.25, 3.3, 1.05, "Hasło", "KTrade2026", C.amber);
  validate(slide);
}

pptx.writeFile({ fileName: "/Users/karolbohdanowicz/my-ai-agents/ai-trading-lab/presentation/KTrade_AI_Trading_Lab_prezentacja.pptx" });
