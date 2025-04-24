"use client";

import { useEffect } from "react";
import {
    onMessageListener,
    requestNotificationPermission
} from "@/features/notifications/firebase";
import { useNotificationsStore } from "@/features/notifications/store";
import { getNotifications, getUnreadNotificationsCount } from "@/features/notifications/services";
import { useAuthStore } from "../auth/store";

export function NotificationsProvider() {
    const token = useAuthStore((state) => state.token);
    const setNotifications = useNotificationsStore((s) => s.setNotifications);
    const add = useNotificationsStore((s) => s.add);

    // Fetch and set initial notifications
    const fetchInitialNotifications = async () => {
        try {
            const notificationsRes = await getNotifications();
            const countRes = await getUnreadNotificationsCount();

            const notifications = notificationsRes?.data || [];
            const count = countRes?.data?.unreadNotificationsCount || 0;

            setNotifications(notifications);
            useNotificationsStore.setState({ unseenCount: count });
        } catch (err) {
            console.error("Error fetching notifications:", err);
        }
    };

    // Convert FCM payload to AppNotification and handle UI logic
    const handleNewNotification = (payload: any) => {
        const newNotification = {
            id: payload.messageId || crypto.randomUUID(),
            title: payload.data.title,
            body: payload.data.body,
            seen: false,
            created_at: new Date().toISOString(),
            ...payload.data
        };

        add(newNotification);

        if (Notification.permission === "granted") {
            new Notification(newNotification.title, {
                body: newNotification.body,
                icon: "/favicon.png"
            });
        }
    };

    useEffect(() => {
        const run = async () => {
            await fetchInitialNotifications();
        };
        if (token) {
            run();
        }
    }, [token]);

    useEffect(() => {
        (async () => {
            try {
                const fcmToken = await requestNotificationPermission();

                await fetch("/api/fcm_token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: fcmToken })
                });

                onMessageListener()?.then(handleNewNotification);
            } catch (error) {
                console.error("Error setting up notifications:", error);
            }
        })();
    }, []);

    return null;
}
