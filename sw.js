const CACHE_NAME = 'brew-haven-v1';
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'menu.html',
  'about.html',
  'blog.html',
  'careers.html',
  'contact.html',
  'events.html', // corrected filename
  'faq.html',
  'reservation.html',
  'style.css',
  'images/hero-bg.jpg',
  'images/latte.webp',
  'images/mocha.webp',
  'images/coffee.webp',
  'images/blackcoffe.webp',
  'images/blueberry.webp',
  'images/interior.webp',
  'images/esspresso.webp'
];

// Install event: Cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
