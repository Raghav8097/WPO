const CACHE_NAME = 'brew-haven-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/menu.html',
  '/about.html',
  '/blog.html',
  '/careers.html',
  '/contact.html',
  '/events.html',
  '/faq.html',
  '/reservation.html',
  '/style.css',
  '/images/beans.webp',
  '/images/blackcoffe.webp',
  '/images/blueberry.webp',
  '/images/coffee.webp',
  '/images/coldcoffee.webp',
  '/images/esspresso.webp',
  '/images/interior.webp',
  '/images/latte-art.webp',
  '/images/latte.webp',
  '/images/mocha.webp',
  '/images/outside.webp', // Updated this to match available image
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
      .catch((error) => console.error('Failed to cache:', error))
  );
});

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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => response)
      .catch(() => {
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (event.request.mode === 'navigate') {
              return caches.match('offline.html');
            }
            return cachedResponse;
          });
      })
  );
});
