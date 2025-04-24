importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyC-HAVwVVciHve4awk5rzo5Z-ZCAektXkA",
    authDomain: "medup-45f75.firebaseapp.com",
    projectId: "medup-45f75",
    storageBucket: "medup-45f75.firebasestorage.app",
    messagingSenderId: "1086205422172",
    appId: "1:1086205422172:web:5a58759dd25b76eb919499"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    // Extract notification data
    const notificationData = {
        title: payload.data.title,
        body: payload.data.body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: payload.messageId, // For notification grouping
        data: payload.data, // Include all custom data
        actions: [
            {
                action: "open",
                title: "Open"
            }
        ]
    };

    return self.registration.showNotification(notificationData.title, notificationData);
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    // Get all windows clients
    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            // If a window client is available, focus it
            for (const client of clientList) {
                if (client.url && "focus" in client) {
                    return client.focus();
                }
            }
            // If no window client, open new window
            if (clients.openWindow) {
                return clients.openWindow("/notifications");
            }
        })
    );
});
