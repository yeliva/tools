const CACHE_NAME = 'faktur-roviana-v1';
// Daftar semua file yang dibutuhkan agar aplikasi bisa berjalan offline
const urlsToCache = [
  '.', // Mewakili file HTML utama
  'manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
  'https://cdn.jsdelivr.net/npm/flatpickr'
];

// Proses instalasi: menyimpan file ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Proses fetch: mencegat permintaan jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, langsung berikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak ada, ambil dari jaringan
        return fetch(event.request);
      })
  );
});