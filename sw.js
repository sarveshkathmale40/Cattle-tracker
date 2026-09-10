const CACHE_NAME = 'mh-farmer-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// १. फाईल्स मोबाईलच्या मेमरीमध्ये तात्काळ सेव्ह करणे (Install)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// २. जुना कॅश क्लिअर करणे (Activate)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// ३. नेटवर्कऐवजी थेट फोन मेमरीतून ०.१ सेकंदात ॲप उघडणे (Fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // जर कॅशमध्ये असेल तर थेट दाखवा (सुपरफास्ट)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      // कॅशमध्ये नसेल तरच इंटरनेटवरून आणा
      return fetch(event.request);
    })
  );
});
