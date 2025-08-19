const CACHE_NAME = 'grocery-snap-find-v2';
const URLS_TO_CACHE = [
  '.',
  './index.html',
  './manifest.json',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './constants.ts',
  './services/geminiService.ts',
  './components/Header.tsx',
  './components/ImageUploader.tsx',
  './components/ResultCard.tsx',
  './components/Spinner.tsx',
  './components/IconComponents.tsx',
  './components/AddItemForm.tsx',
  './components/UnmatchedItemCard.tsx',
  'https://cdn.tailwindcss.com',
  'https://esm.sh/react-dom@^19.1.1/',
  'https://esm.sh/react@^19.1.1',
  'https://esm.sh/@google/genai@^1.15.0',
  'https://storage.googleapis.com/project-hosting-images/grocery-snap-and-find-icon-192.png',
  'https://storage.googleapis.com/project-hosting-images/grocery-snap-and-find-icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Add all URLs to cache, but don't fail the install if one of the external resources fails
        const cachePromises = URLS_TO_CACHE.map(urlToCache => {
            return cache.add(urlToCache).catch(err => {
                console.warn(`Failed to cache ${urlToCache}:`, err);
            });
        });
        return Promise.all(cachePromises);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
              return response;
            }
            
            // Don't cache API calls
            if(event.request.url.includes('generativelanguage.googleapis.com')) {
                return response;
            }

            // Clone the response because it's a stream and can only be consumed once.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});