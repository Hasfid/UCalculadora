/** Configuracion de registro PWA. Modificar scope si cambia la ruta publica de GitHub Pages. */
const PWA_CONFIG = { SERVICE_WORKER_PATH: "uc-sw.js", SCOPE: "/UCalculadora/", EVENT_CATEGORY: "PwaInteraccion" };

//This is the service worker with the combined offline experience (Offline page + Offline copy of pages)
//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
if (navigator.serviceWorker.controller) {
  // Registro de consola original mantenido por requerimientos de sistema (Mantenimiento)
  console.log('[PWA] active service worker found, no need to register')
} else {

  //Register the ServiceWorker
  navigator.serviceWorker.register(PWA_CONFIG.SERVICE_WORKER_PATH, {
    scope: PWA_CONFIG.SCOPE
  }).then(function (reg) {
    // Registro de consola original para validación PWA (Mantenimiento)
    console.log('Service worker has been registered for scope:' + reg.scope);
  });
}

/*EVENTS */
window.addEventListener('beforeinstallprompt', function (e) {
  gtag('event', "PopInstall?", {
    'event_category': PWA_CONFIG.EVENT_CATEGORY
  });

  e.userChoice.then(function (choiceResult) {
    gtag('event', "AnswerPop", {
      'event_category': PWA_CONFIG.EVENT_CATEGORY,
      'event_label': choiceResult.outcome
    });
  });
});