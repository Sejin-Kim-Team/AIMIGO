const cacheName = 'cache-name';
const cacheUrl = [
    '/',
    '/offline',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => cache.addAll(cacheUrl))
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
