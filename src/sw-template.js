// import { readAllData } from './utils/commonHelper';

function openDB(st) {
  // store
  //   .getAll()
  //   .then(function(res) {
  //     console.log('eeeeeeeeeeeeeeeeeeee', res);
  //   })
  //   .catch(err => {
  //     console.log('rrrrrrrrrrrrrrrrrrr', err);
  //   });
  // };
}

if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  // importScripts('commonHelper.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
  self.addEventListener('sync', function(event) {
    console.log('[Service Worker] do Background syncing', event);
    if (event.tag === 'new-post') {
      console.log('[Service Worker] syncing new post');
      // console.log('llllllll', openDB('sync-posts'));
      var DBOpenRequest = indexedDB.open('MyTestDatabase');
      DBOpenRequest.onsuccess = function(e) {
        let db = DBOpenRequest.result;
        let tx = db.transaction(['sync-posts'], 'readonly');
        let store = tx.objectStore('sync-posts');
        let data = store.getAll();
        data.onsuccess = function(e) {
          console.log('ddddddddddddddddd', data.result);
          data.result.length &&
            data.result.map(res => {
              let tx = db.transaction(['sync-posts'], 'readwrite');
              let store = tx.objectStore('sync-posts');
              store.delete(res.id);
            });
        };
      };
      // event.waitUntill(
      //   readAllData('sync-posts').then(function(data) {
      //     data.map(syncData => {
      //       console.log('data=========>>>>>', syncData);
      //       console.log('====Update Data====');
      //     });
      //     alert('Hit server api here');
      //   })
      // );
    }
  });
}
