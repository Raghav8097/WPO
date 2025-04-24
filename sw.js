const CACHE_NAME = 'brew-haven-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/menu.html',
  '/about.html',
  '/blog.html',
  '/contact.html',
  '/events.html',
  '/faq.html',
  '/reservation.html',
  '/style.css',
  '/images/latte.webp',
  '/images/mocha.webp',
  '/images/coffee.webp',
  '/images/blackcoffe.webp',
  '/images/blueberry.webp',
  '/images/interior.webp',
  '/images/esspresso.webp'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing and caching these files:', URLS_TO_CACHE);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Log files being cached
        console.log('Caching files...');
        return Promise.all(
          URLS_TO_CACHE.map((url) => {
            console.log(`Caching: ${url}`);
            return cache.add(url).catch((error) => {
              console.error(`Failed to cache: ${url}`, error);
            });
          })
        );
      })
      .catch((error) => {
        console.error('Error during caching:', error);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log(`Deleting old cache: ${name}`);
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;  // Return cached response
      }
      return fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch(() => {
          // Serve offline page if unable to fetch
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
    })
  );
});
