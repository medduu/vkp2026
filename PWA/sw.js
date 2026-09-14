const CACHE_NAME = 'v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './images/background.jpg',
  './images/icons/icon-152x152.png',
  './images/icons/icon-192x192.png',
  './images/icons/icon-256x256.png',
  './fonts/TenorSans-Regular.ttf',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(STATIC_ASSETS);
      console.log('Static assets cached');
    } catch (error) {
      console.error('Caching failed:', error.message);
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    } catch (error) {
      console.error('Cache cleanup failed:', error.message);
    }
  })());
});

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      const cachedResponse = await caches.match(event.request);
      return cachedResponse || await fetch(event.request);
    } catch (error) {
      console.error('Fetch failed:', error.message);
      return caches.match('./index.html');
    }
  })());
});