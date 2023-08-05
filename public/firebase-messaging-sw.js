importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyB0weP8vq3C9GBgRVUnkQYkBwXWY_HOr7I',
    authDomain: 'aimigo-83ddd.firebaseapp.com',
    projectId: 'aimigo-83ddd',
    storageBucket: 'aimigo-83ddd.appspot.com',
    messagingSenderId: '971619671165',
    appId: '1:971619671165:web:e856f2035d1588d2de6514',
    measurementId: 'G-W8BBTDY1TD',
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification clicked', event);
    event.notification.close();
    event.waitUntil(
        clients
        .matchAll({
            type: "window",
        })
        .then((clientList) => {
            for (const client of clientList) {
                if (client.url === "/chat" && "focus" in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow("/chat");
        }),
    );
})

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/favicon.ico',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
    };
    self.registration.showNotification(notificationTitle, notificationOptions);

});
