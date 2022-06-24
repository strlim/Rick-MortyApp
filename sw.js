const VERSION = 'version1';

importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
  );

  if(workbox) {
    console.log('workbox bien');

    self.addEventListener("message", (e)=>{
      if(e.data && e.data.type === "SKIP_WAITING") {
        self.skipWaiting();
      }
    });

    workbox.routing.registerRoute(
      new RegExp('/*'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: VERSION
      })
    )
  
  } else {
    console.log('Workbox, que es eso?');
  }