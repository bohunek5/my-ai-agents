<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
p24_security_headers();
$sessionId = (string) ($_GET['session'] ?? '');
$validSession = preg_match('/\AMA-[0-9]{8}-[a-f0-9]{32}\z/', $sessionId) === 1;
?><!doctype html>
<html lang="pl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>Status płatności | Mazury Aktywnie</title>
    <style>
        :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
        * { box-sizing: border-box; }
        body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; color: #172033; background: linear-gradient(145deg,#eaf7ff,#f4f8ff 45%,#e9f5ee); }
        main { width: min(560px,100%); background: rgba(255,255,255,.94); border: 1px solid rgba(255,255,255,.8); border-radius: 28px; padding: 36px; box-shadow: 0 24px 70px rgba(31,67,111,.16); text-align: center; }
        .mark { width: 64px; height: 64px; margin: 0 auto 20px; border-radius: 999px; display: grid; place-items: center; font-size: 30px; background: #e9f2ff; color: #1565c0; }
        h1 { margin: 0 0 12px; font-size: clamp(24px,5vw,34px); }
        p { margin: 0 auto 18px; color: #536078; line-height: 1.6; }
        a { display: inline-block; padding: 13px 20px; border-radius: 14px; background: #1769cc; color: #fff; font-weight: 750; text-decoration: none; }
        .details { margin: 18px 0 24px; font-size: 14px; }
    </style>
</head>
<body>
<main>
    <div class="mark" id="mark" aria-hidden="true">…</div>
    <h1 id="title">Sprawdzamy płatność</h1>
    <p id="message">Przelewy24 przekazuje nam potwierdzenie. Zwykle trwa to kilka sekund.</p>
    <p class="details" id="details"></p>
    <a href="/reservation/">Wróć do rezerwacji</a>
</main>
<script>
(() => {
    const session = <?= json_encode($validSession ? $sessionId : '', JSON_UNESCAPED_SLASHES) ?>;
    const title = document.getElementById('title');
    const message = document.getElementById('message');
    const mark = document.getElementById('mark');
    const details = document.getElementById('details');
    let tries = 0;
    const render = (data) => {
        if (data.status === 'paid') {
            mark.textContent = '✓'; mark.style.color = '#087f5b'; mark.style.background = '#e6fcf5';
            title.textContent = 'Płatność potwierdzona';
            message.textContent = 'Dziękujemy. Rezerwacja została opłacona i zapisana.';
            details.textContent = `Kwota: ${data.amount_pln} PLN · termin: ${data.start_date} – ${data.end_date}`;
            return true;
        }
        if (data.status === 'failed' || data.status === 'unknown') {
            mark.textContent = '!'; mark.style.color = '#c92a2a'; mark.style.background = '#fff0f0';
            title.textContent = 'Nie udało się potwierdzić płatności';
            message.textContent = 'Środki nie zostały oznaczone jako opłacone. Spróbuj ponownie lub skontaktuj się z nami.';
            return true;
        }
        return false;
    };
    const poll = async () => {
        if (!session) { render({status:'unknown'}); return; }
        try {
            const response = await fetch(`/payments/check.php?session=${encodeURIComponent(session)}`, {cache:'no-store'});
            const data = await response.json();
            if (render(data)) return;
        } catch (_) {}
        tries += 1;
        if (tries < 15) setTimeout(poll, 2000);
        else {
            title.textContent = 'Płatność jest jeszcze weryfikowana';
            message.textContent = 'Nie ponawiaj płatności. Jeśli status nie zmieni się w ciągu kilku minut, skontaktuj się z nami.';
        }
    };
    poll();
})();
</script>
</body>
</html>

