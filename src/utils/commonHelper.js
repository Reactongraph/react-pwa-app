// let dbPromise = indexedDB.open('afdafasfasf', 1, function(db) {
//   console.log('ffffffffffffff', db);
// });

// dbPromise.then(function(db) {
//   console.log('EEEEEEEEEEEEEEEE', db);
// });

// if (!db.objectStoreNames.contains('posts')) {
//   db.createObjectStore('posts', { keyPath: 'id' });
// }
// if (!db.objectStoreNames.contains('sync-posts')) {
//   db.createObjectStore('sync-posts', { keyPath: 'id' });
// }
// console.log('DDDDDDDDDDDDDDDDDDDDDDDDDd', dbPromise);
// console.log('DDDDDDDDDDDDDDDDDDDDDDDDDd', dbPromise.transaction);
// console.log('resultDDDDd', dbPromise.result);
// console.log(
//   'DDDDDDDDDDDDDDDIDBOpenDBRequestDDDDDDDDDDd',
//   dbPromise[IDBOpenDBRequest]
// );
// console.log('DDDDDDDDDDDDDDDDDDDDDDDDDd', dbPromise.readyState);
// if (dbPromise.readyState === 'done') {
// }
// console.log('DDDDDDDDDDDDDDDDDDDDDDDDDd', dbPromise);
// console.log('DDDDDDDDDDDDDDDDDDDDDDDDDd', dbPromise.IDBOpenDBRequest.result);

let db;
let openRequest = indexedDB.open('MyTestDatabase');
// request.onerror = function(event) {
//   console.log("Why didn't you allow my web app to use IndexedDB?!");
// };
// request.onsuccess = function(event) {
//   db = event.target.result;
//   request.onupgradeneeded = function(event) {
//     var db = event.target.result;
//   };
//   if (!db.objectStoreNames.contains('posts')) {
//     db.createObjectStore('posts', { keyPath: 'id' });
//   }
//   if (!db.objectStoreNames.contains('sync-posts')) {
//     db.createObjectStore('sync-posts', { keyPath: 'id' });
//   }
// };

openRequest.onupgradeneeded = function(e) {
  let thisDB = e.target.result;
  console.log('running onupgradeneeded');
  // if (!thisDB.objectStoreNames.contains('firstOS')) {
  //   console.log('makng a new object store');
  //   thisDB.createObjectStore('firstOS');
  // }

  if (!thisDB.objectStoreNames.contains('posts')) {
    thisDB.createObjectStore('posts', { keyPath: 'id' });
  }
  if (!thisDB.objectStoreNames.contains('sync-posts')) {
    thisDB.createObjectStore('sync-posts', { keyPath: 'id' });
  }
};

openRequest.onsuccess = function(e) {
  console.log('running onsuccess');
  db = e.target.result;
  console.dir(db.objectStoreNames);
};

openRequest.onerror = function(e) {
  console.log('onerror!');
  console.dir(e);
};

export function writeData(st, data) {
  console.log('-====enter=====', db);
  // // return dbPromise.then(function(db) {
  let tx = db.transaction([st], 'readwrite');
  let store = tx.objectStore(st);
  store.put(data);
  console.log('dddddddddddddddd', tx);
  return tx.complete;
  // })
}
export function readAllData(st) {
  // return dbPromise.then(function(db) {
  let tx = db.transaction([st], 'readonly');
  let store = tx.objectStore(st);
  console.log('dddddddddddddddd', tx);
  return store.getAll();
  // });
}

export function deleteData(st, id) {
  let tx = db.transaction([st], 'readwrite');
  let store = tx.objectStore(st);
  store.delete(id);
  console.log('Item deleted');
  return tx.complete;
}
