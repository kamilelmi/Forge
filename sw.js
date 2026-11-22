// Forge service worker: keeps the app and its images available offline.
const VERSION = 'forge-v1';
const ASSETS = [
  './', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './maskable-512.png', './favicon-32.png',
  './img/air-bike-main.webp',
  './img/assisted-dips-peak.webp',
  './img/assisted-dips-start.webp',
  './img/assisted-pull-ups-peak.webp',
  './img/assisted-pull-ups-start.webp',
  './img/bench-press-peak.webp',
  './img/bench-press-start.webp',
  './img/bulgarian-split-squat-peak.webp',
  './img/bulgarian-split-squat-start.webp',
  './img/cable-crunch-peak.webp',
  './img/cable-crunch-start.webp',
  './img/cable-curl-peak.webp',
  './img/cable-curl-start.webp',
  './img/cable-lateral-raise-peak.webp',
  './img/cable-lateral-raise-start.webp',
  './img/cable-overhead-tricep-extension-peak.webp',
  './img/cable-overhead-tricep-extension-start.webp',
  './img/chest-supported-db-row-peak.webp',
  './img/chest-supported-db-row-start.webp',
  './img/chest-supported-machine-row-peak.webp',
  './img/chest-supported-machine-row-start.webp',
  './img/hack-squat-peak.webp',
  './img/hack-squat-start.webp',
  './img/hanging-leg-raise-peak.webp',
  './img/hanging-leg-raise-start.webp',
  './img/hex-bar-deadlift-peak.webp',
  './img/hex-bar-deadlift-start.webp',
  './img/incline-db-curl-peak.webp',
  './img/incline-db-curl-start.webp',
  './img/incline-db-press-peak.webp',
  './img/incline-db-press-start.webp',
  './img/incline-treadmill-walk-main.webp',
  './img/lat-pulldown-peak.webp',
  './img/lat-pulldown-start.webp',
  './img/lateral-raise-peak.webp',
  './img/lateral-raise-start.webp',
  './img/leg-press-peak.webp',
  './img/leg-press-start.webp',
  './img/machine-reverse-fly-peak.webp',
  './img/machine-reverse-fly-start.webp',
  './img/ohp-peak.webp',
  './img/ohp-start.webp',
  './img/rear-delt-fly-peak.webp',
  './img/rear-delt-fly-start.webp',
  './img/romanian-deadlift-peak.webp',
  './img/romanian-deadlift-start.webp',
  './img/rowing-machine-peak.webp',
  './img/rowing-machine-start.webp',
  './img/running-main.webp',
  './img/seated-leg-curl-peak.webp',
  './img/seated-leg-curl-start.webp',
  './img/squat-peak.webp',
  './img/squat-start.webp',
  './img/standing-calf-raise-peak.webp',
  './img/standing-calf-raise-start.webp',
  './img/stationary-bike-main.webp',
  './img/weighted-dips-peak.webp',
  './img/weighted-dips-start.webp',
  './img/weighted-pull-up-peak.webp',
  './img/weighted-pull-up-start.webp'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => { const c = res.clone(); caches.open(VERSION).then(x => x.put('./index.html', c)); return res; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(l => l.length ? l[0].focus() : self.clients.openWindow('./')));
});
