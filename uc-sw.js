/**
 * @file uc-sw.js
 * @description Service Worker de UCalculadora para soporte PWA (Progressive Web App) y funcionamiento sin conexión (offline).
 * Administra el caché local mediante Google Workbox, almacenando archivos críticos (HTML, CSS, JS) en el dispositivo del usuario para permitir accesibilidad cuando no hay conexión a internet, 
 * y maneja las políticas de actualización de recursos.
 */
/** Configuracion del service worker offline. Modificar nombres de cache y precarga si cambia la estrategia PWA. */
const SERVICE_WORKER_CONFIG = { WORKBOX_URL: "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js", CACHE_NAME: "pwabuilder-offline", PRECACHE_URLS: ["./offline.html", "./index.html"], OFFLINE_URL: "offline.html" };

// Este es el Service Worker que maneja la experiencia combinada offline (página offline y copia de páginas en caché)
importScripts(SERVICE_WORKER_CONFIG.WORKBOX_URL);
//workbox.googleAnalytics.initialize();

workbox.googleAnalytics.initialize({
  parameterOverrides: {
    cd2: 'Offline',
  },
});

// El paso 'Install' configura la página offline en el caché y abre un caché nuevo
self.addEventListener('install', function (event) {
  event.waitUntil(preLoad());
});

var preLoad = function () {
  //console.log('[PWA] Install Event processing');
  return caches.open(SERVICE_WORKER_CONFIG.CACHE_NAME).then(function (cache) {
    //console.log('[PWA] Cached index and offline page during Install');
    return cache.addAll(SERVICE_WORKER_CONFIG.PRECACHE_URLS);
  });
}

self.addEventListener('fetch', function (event) {
  //console.log('[PWA] The service worker is serving the asset.');
  event.respondWith(checkResponse(event.request).catch(function () {
    return returnFromCache(event.request)
  }
  ));
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function (request) {
  return new Promise(function (fulfill, reject) {
    fetch(request).then(function (response) {
      if (response.status !== 404) {
        fulfill(response)
      } else {
        reject()
      }
    }, reject)
  });
};

var addToCache = function (request) {
  return caches.open(SERVICE_WORKER_CONFIG.CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      //console.log('[PWA] add page to offline'+response.url)
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function (request) {
  return caches.open(SERVICE_WORKER_CONFIG.CACHE_NAME).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status == 404) {
        return cache.match(SERVICE_WORKER_CONFIG.OFFLINE_URL)
      } else {
        return matching
      }
    });
  });
};

