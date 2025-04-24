import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
    apiKey: "AIzaSyC-HAVwVVciHve4awk5rzo5Z-ZCAektXkA",
    authDomain: "medup-45f75.firebaseapp.com",
    projectId: "medup-45f75",
    storageBucket: "medup-45f75.firebasestorage.app",
    messagingSenderId: "1086205422172",
    appId: "1:1086205422172:web:5a58759dd25b76eb919499"
};

export const app = initializeApp(firebaseConfig);

async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                "/firebase-messaging-sw.js",
                {
                    scope: "/"
                }
            );

            return registration;
        } catch (error) {
            console.error("Service Worker registration failed:", error);

            throw error;
        }
    }

    throw new Error("Service Worker not supported");
}

// Get messaging instance
export const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

// Function to request notification permission
export async function requestNotificationPermission() {
    try {
        await registerServiceWorker();

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            return await getFCMToken();
        }
        throw new Error("Notification permission denied");
    } catch (error) {
        console.error("Error requesting notification permission:", error);
        throw error;
    }
}

// Function to get FCM token
export async function getFCMToken() {
    try {
        if (!messaging) throw new Error("Messaging is not initialized");

        const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });
        return token;
    } catch (error) {
        console.error("Error getting FCM token:", error);
        throw error;
    }
}

// Function to handle foreground messages
export function onMessageListener() {
    if (!messaging) return;

    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
}
