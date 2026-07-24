const devices = [...document.querySelectorAll(".device")];
const frames = [...document.querySelectorAll("iframe")];
const form = document.querySelector("#urlForm");
const input = document.querySelector("#urlInput");
const rotateButton = document.querySelector("#rotateButton");
const refreshButton = document.querySelector("#refreshButton");
const resetButton = document.querySelector("#resetButton");

const viewports = {
  phone: {
    portrait: { width: 402, height: 874 },
    landscape: { width: 874, height: 402 }
  },
  tablet: {
    portrait: { width: 834, height: 1194 },
    landscape: { width: 1194, height: 834 }
  }
};

let rotated = false;

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "http://localhost:3000";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^localhost(:|\/|$)/i.test(trimmed)) return `http://${trimmed}`;
  if (/^\d+$/.test(trimmed)) return `http://localhost:${trimmed}`;
  return `https://${trimmed}`;
}

function setUrl(nextUrl, replace = false) {
  const url = normalizeUrl(nextUrl);
  input.value = url;

  frames.forEach((frame) => {
    frame.src = url;
  });

  const stateUrl = new URL(window.location.href);
  stateUrl.searchParams.set("url", url);
  window.history[replace ? "replaceState" : "pushState"]({}, "", stateUrl);
}

function applyDeviceOrientation(device, orientation) {
  const kind = device.dataset.kind;
  const viewport = viewports[kind][orientation];
  const label = device.querySelector(".device-label strong");
  const frame = device.querySelector("iframe");
  const hardware = device.querySelector(".hardware");

  device.classList.toggle("portrait", orientation === "portrait");
  device.classList.toggle("landscape", orientation === "landscape");
  device.style.setProperty("--frame-w", `${viewport.width}px`);
  device.style.setProperty("--frame-h", `${viewport.height}px`);
  device.dataset.size = `${viewport.width} x ${viewport.height}`;
  label.textContent = `${viewport.width} x ${viewport.height}`;
  frame.title = `${device.dataset.device} ${orientation} preview`;
  hardware.title = "Klikaj i przewijaj bezposrednio w podgladzie";
}

function rotateDevices() {
  rotated = !rotated;

  devices.forEach((device) => {
    const kind = device.dataset.kind;
    const orientation = kind === "phone"
      ? (rotated ? "landscape" : "portrait")
      : (rotated ? "portrait" : "landscape");
    applyDeviceOrientation(device, orientation);
  });
}

function refreshAll() {
  frames.forEach((frame) => {
    try {
      frame.contentWindow.location.reload();
    } catch {
      frame.src = input.value;
    }
  });
}

function withCacheBuster(url) {
  const next = new URL(url);
  next.searchParams.set("look-cache", Date.now().toString());
  return next.toString();
}

async function resetAndClearCache() {
  localStorage.clear();
  sessionStorage.clear();

  if ("caches" in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
  }

  const cleanUrl = normalizeUrl(input.value);
  const bustedUrl = withCacheBuster(cleanUrl);
  input.value = cleanUrl;

  frames.forEach((frame) => {
    frame.src = bustedUrl;
  });
}

devices.forEach((device) => {
  const hardware = device.querySelector(".hardware");
  const label = device.querySelector(".device-label");
  const size = device.dataset.size;
  const name = device.dataset.device;
  label.title = `${name} - ${size}`;
  hardware.title = "Klikaj i przewijaj bezposrednio w podgladzie";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  setUrl(input.value);
});

refreshButton.addEventListener("click", refreshAll);
rotateButton.addEventListener("click", rotateDevices);
resetButton.addEventListener("click", () => {
  resetAndClearCache().catch(() => {
    frames.forEach((frame) => {
      frame.src = withCacheBuster(normalizeUrl(input.value));
    });
  });
});

window.addEventListener("popstate", () => {
  const params = new URLSearchParams(window.location.search);
  setUrl(params.get("url") || "http://localhost:3000", true);
});

const params = new URLSearchParams(window.location.search);
devices.forEach((device) => {
  applyDeviceOrientation(device, device.classList.contains("portrait") ? "portrait" : "landscape");
});
setUrl(params.get("url") || "http://localhost:3000", true);
