const CACHE_NAME = 'brew-haven-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/menu.html',
  '/about.html',
  '/blog.html',
  '/careers.html',
  '/contact.html',
  '/events.html', // ensure this matches your actual filename
  '/faq.html',
  '/reservation.html',
  '/style.css',
  '/images/hero-bg.jpg',
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
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch((error) => {
        console.error('Failed to cache:', error);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
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
      return response || fetch(event.request);
    }).catch(() => {
      // Optional: serve fallback offline page
      if (event.request.mode === 'navigate') {
        return caches.match('/offline.html');
      }
    })
  );
});
