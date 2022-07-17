const CACHE_NAMNE = 'v1_cache_vue_counter_app'
const urlsToCache = [
  './',
  './assets/images/favicon.png',
  './assets/images/icon32.png',
  './assets/images/icon64.png',
  './assets/images/icon128.png',
  './assets/images/icon256.png',
  './assets/images/icon512.png',
  './assets/images/icon1024.png',
  'https://unpkg.com/vue@next',
  'https://necolas.github.io/normalize.css/8.0.1/normalize.css',
  './js/main.js',
  './css/style.css'
]

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAMNE)
    .then(cache => cache.addAll(urlsToCache)
      .then(() => self.skipWaiting())
      .catch(err => console.log(err))))
})

self.addEventListener('activate', e => {
  const cacheWhiteList = [CACHE_NAMNE]
  e.waitUntil(caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    }
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  e.responseWith(caches.match(e.request)
    .then(res => {
      if (res) {
        return res
      }
      return fetch(e.request)
    })
    )
})