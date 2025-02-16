// Define the cache name and the files to cache
const CACHE_NAME = 'my-app-cache-v3'; // Updated cache name for versioning
const urlsToCache = [
  '/',
  '/index.html', // Ensure the main page is cached
  '/static/js/main.chunk.js',
  '/static/css/main.chunk.css',
];

// Install event - Cache essential files
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching files:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[Service Worker] Failed to cache files:', error);
      })
  );
});

// Activate event - Delete old caches when a new version is installed
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).catch((error) => {
      console.error('[Service Worker] Failed to delete old caches:', error);
    })
  );
});

// Fetch event - Serve files from cache first, then try fetching from network
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('[Service Worker] Serving from cache:', event.request.url);
          return response;
        }

        console.log('[Service Worker] Not found in cache, fetching from network:', event.request.url);
        return fetch(event.request).then((networkResponse) => {
          // Ensure the response is valid
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Clone the response and cache it
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        });
      }).catch(() => {
        // Fallback to offline page or index.html if the request fails
        if (event.request.mode === 'navigate') {
          console.log('[Service Worker] Returning fallback page (/index.html)');
          return caches.match('/index.html');
        }
      })
  );
});