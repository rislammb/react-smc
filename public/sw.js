const staticCache = 'static-cache-v3';
const dynamicCache = 'dynamic-cache-v3';

const fileToCache = [
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/vendors~main.chunk.js',
  '/index.html',
  '/',
  '/form-icons/capsule.svg',
  '/form-icons/default.svg',
  '/form-icons/drop.svg',
  '/form-icons/infusion.svg',
  '/form-icons/injection.svg',
  '/form-icons/ointment.svg',
  '/form-icons/solution.svg',
  '/form-icons/suppository.svg',
  '/form-icons/suspension.svg',
  '/form-icons/syrup.svg',
  '/form-icons/tablet.svg',
  'https://fonts.gstatic.com/s/titilliumweb/v9/NaPecZTIAOhVxoMyOr9n_E7fdMPmDQ.woff2',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCache).then(function (cache) {
      return cache.addAll(fileToCache);
    })
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (evt) => {
  if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
    if (!(evt.request.url.indexOf('http') === 0)) return;
    evt.respondWith(
      caches.match(evt.request).then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCache).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicCache, 15);
              return fetchRes;
            });
          })
        );
      })
    );
  }
});

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
