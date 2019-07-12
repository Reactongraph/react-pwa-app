// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

let enableNotification = document.getElementsByClassName('enable-notification');
// console.log('@@@@@@@@@@@@@@@@@@@@@', enableNotification);

export function register(config) {
  // console.log('>>>>>>>>>>>>Before Registering<<<<<<<<<<<<<<<<<<<<');
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // console.log('>>>>>>>>>>>>Production<<<<<<<<<<<<<<<<<<<<');
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // console.log('ffffffffffffffff');
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      // console.log('======Here=======', isLocalhost);

      // const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          // console.log('Hellooooooooooooooooooooooo');
          if ('Notification' in window) {
            // console.log('gggggggggggggg');
            for (let i = 0; i < 1; i++) {
              // console.log('-------enterrrr-------');
              document
                .getElementById('enable-notification')
                .addEventListener('click', askForNotificationPermission);
            }
          }
          // console.log('Hellooooooooooooooooooooooo');
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // console.log('Not localhost');
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function displayConfirmNotification() {
  if ('serviceWorker' in navigator) {
    let options = {
      body: 'You successfully subscribed my Notification service',
      image: '/src/container/images/icon.png',
      dir: 'rtl',
      vibrate: [100, 50, 200],
      tag: 'confirm-notification',
      renotify: true
    };
    navigator.serviceWorker.ready.then(function(swreg) {
      swreg.showNotification('Successfully notified from (SWREG)', options);
    });
  }
}

function askForNotificationPermission() {
  // console.log('Clickeddddddddddddddddddddddd');

  Notification.requestPermission(function(result) {
    // console.log('User Choice', result);
    if (result !== 'granted') {
      console.log('No notification persmission granted');
    } else {
      // console.log('Successfully granted');
      // document.getElementById('enable-notification').style.display =
      //   'inline-block';
      // configurePushSub();
      displayConfirmNotification();
    }
  });
}

// function configurePushSub() {
//   if (!('serverWorker' in navigator)) {
//     return;
//   }

//   navigator.serviceWorker.ready
//     .then(function(swreg) {
//       return swreg.pushManager.getSubscription();
//     })
//     .then(function(sub) {
//       if (sub === null) {
//         // Create subscription
//       } else {
//         // We have subscription
//       }
//     });
// }

function registerValidSW(swUrl, config) {
  console.log('Enter to register');

  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      // console.log('registerrrrrrrrrrr');

      registration.onupdatefound = () => {
        console.log('sssssssssssssssss');

        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              if ('Notification' in window) {
                // console.log('gggggggggggggg');
                for (let i = 0; i < 1; i++) {
                  // console.log('-------enterrrr-------');
                  document
                    .getElementById('enable-notification')
                    .addEventListener('click', askForNotificationPermission);
                }
              }
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
      if ('Notification' in window) {
        // console.log('Notification');
        for (let i = 0; i < 1; i++) {
          // console.log('-------enterrrr-------');
          document
            .getElementById('enable-notification')
            .addEventListener('click', askForNotificationPermission);
        }
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
