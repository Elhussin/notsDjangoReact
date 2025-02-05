// Define the cache name and the files to cache
const CACHE_NAME = 'my-app-cache-v2';  // Updated cache name for versioning
const urlsToCache = [
  '/',
  '/index.html',  // Ensure the main page is cached
  '/static/js/main.chunk.js',
  '/static/css/main.chunk.css',
];

// Install event - Cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - Delete old caches when a new version is installed
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - Serve files from cache first, then try fetching from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }
        console.log('Fetching from network:', event.request.url);
        return fetch(event.request);
      }).catch(() => {
        // Optional: Return a fallback page if offline and request fails
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});
