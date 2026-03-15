/**
 * GRAVITY VOICE BRIDGE v2
 * Port 7777 — Zosia TTS + speaking state broadcast
 */

const http = require('http');
const { exec } = require('child_process');

const PORT = 7777;

// ── Speaking state ────────────────────────────────────────────
let isSpeaking = false;
let speakTimer = null;

function estimateDuration(text) {
    // ~10 chars per second for Polish TTS
    return Math.max(1000, (text.length / 10) * 1000 + 600);
}

function setSpeaking(text) {
    isSpeaking = true;
    clearTimeout(speakTimer);
    speakTimer = setTimeout(() => { isSpeaking = false; }, estimateDuration(text));
}

// ── Server ────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204); res.end(); return;
    }

    // ── GET /ping ──
    if (req.method === 'GET' && req.url === '/ping') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'GRAVITY VOICE BRIDGE ONLINE', voice: 'Zosia' }));
        return;
    }

    // ── GET /speaking  ← NOWY endpoint dla canvas ──
    if (req.method === 'GET' && req.url === '/speaking') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ speaking: isSpeaking }));
        return;
    }

    // ── POST /say ──
    if (req.method === 'POST' && req.url === '/say') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const { text, voice } = JSON.parse(body);
                const selectedVoice = voice || 'Zosia';

                if (!text || text.trim() === '') {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Brak tekstu' }));
                    return;
                }

                const safeText = text.replace(/"/g, '').replace(/'/g, '').replace(/\n/g, ' ').substring(0, 800);
                console.log(`[ZOSIA]: ${safeText.substring(0, 60)}...`);

                // Ustaw speaking PRZED uruchomieniem say
                setSpeaking(safeText);

                exec('killall say', () => {
                    exec(`say -v ${selectedVoice} "${safeText}"`, (err) => {
                        isSpeaking = false; // dokładny koniec
                        if (err) console.error('Say error:', err);
                    });
                });

                res.writeHead(200);
                res.end(JSON.stringify({ status: 'speaking', voice: selectedVoice }));

            } catch (e) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'JSON parse error' }));
            }
        });
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`🎙️  GRAVITY VOICE BRIDGE v2 uruchomiony na porcie ${PORT}`);
    console.log(`🔊 Endpoint /speaking dostępny dla canvas reaction`);
});
