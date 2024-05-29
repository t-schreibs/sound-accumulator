/* global VERSION */
/* eslint-disable no-restricted-globals */
/* eslint-env serviceworker */

const CACHE_KEYS = {
    PRE_CACHE: `precache-${VERSION}`,
    RUNTIME: `runtime-${VERSION}`
};
const EXCLUDED_URLS = [];
const PRE_CACHE_URLS = [
    '/',
    '/css/base.css'
];
const IGNORED_HOSTS = [
    'localhost'
];

const addItemsToCache = (cacheName, items = []) => {
    caches.open(cacheName).then((cache) => cache.addAll(items));
  };
self.addEventListener('install', () => {
  self.skipWaiting();
  addItemsToCache(CACHE_KEYS.PRE_CACHE, PRE_CACHE_URLS);
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => cacheNames.filter((item) => !Object.values(CACHE_KEYS).includes(item)))
      .then((itemsToDelete) => Promise.all(itemsToDelete.map((item) => caches.delete(item))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (event) => {
  const { hostname } = new URL(event.request.url);
  if (IGNORED_HOSTS.indexOf(hostname) >= 0 ||
  EXCLUDED_URLS.some((page) => event.request.url.indexOf(page) > -1)) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return caches.open(CACHE_KEYS.RUNTIME).then((cache) => (
        fetch(event.request)
          .then((response) => (
            cache.put(event.request, response.clone()).then(() => response)
          ))
      ));
    }),
  );
});