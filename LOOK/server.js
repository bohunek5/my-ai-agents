const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || process.argv[2] || 3001);
const targetUrl = process.env.TARGET_URL || process.argv[3] || "http://localhost:3000";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function safeFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = cleanPath === "/" ? "/index.html" : cleanPath;
  const resolved = path.resolve(root, `.${relativePath}`);
  return resolved.startsWith(root) ? resolved : null;
}

const server = http.createServer((req, res) => {
  if (!req.url) {
    send(res, 400, "Bad request");
    return;
  }

  const parsed = new URL(req.url, `http://localhost:${port}`);
  if (parsed.pathname === "/" && !parsed.searchParams.has("url") && targetUrl) {
    res.writeHead(302, { Location: `/?url=${encodeURIComponent(targetUrl)}` });
    res.end();
    return;
  }

  const filePath = safeFile(parsed.pathname);
  if (!filePath) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found");
      return;
    }

    send(res, 200, data, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Try PORT=3011 npm start or stop the process using ${port}.`);
    process.exit(1);
  }

  throw error;
});

server.listen(port, () => {
  console.log(`LOOK preview: http://localhost:${port}/?url=${encodeURIComponent(targetUrl)}`);
});
