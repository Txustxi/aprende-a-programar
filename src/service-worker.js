const cacheName = 'aprende-a-programar-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/scripts.js'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(filesToCache))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});
