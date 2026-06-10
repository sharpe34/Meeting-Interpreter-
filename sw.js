const CACHE = 'smi-v99-bust';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  // Always network first - no caching
  e.respondWith(fetch(e.request).catch(() => new Response('Offline')));
});
