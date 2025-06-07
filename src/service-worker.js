const cacheName = 'aprende-a-programar-v1';
const filesToCache = [
    './',
    './index.html',
    './styles.css',
    './scripts.js'
];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(filesToCache))
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key => caches.delete(key))
            )
        )
    );
    return self.clients.claim();
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});
