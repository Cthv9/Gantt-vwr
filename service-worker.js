const CACHE_NAME = 'gantt-cache-v1';
const urlsToCache = [
  '/Gantt-vwr/',
  '/Gantt-vwr/index.html',
  '/Gantt-vwr/manifest.json',
  '/Gantt-vwr/service-worker.js',
  'https://cdnjs.cloudflare.com/ajax/libs/frappe-gantt/0.5.0/frappe-gantt.css',
  'https://cdnjs.cloudflare.com/ajax/libs/frappe-gantt/0.5.0/frappe-gantt.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
