import { fetcherClient, FetcherClientOptions } from "@/utils/fetcher-client";
import type { AppNotification } from "./types";

export async function getNotifications(options?: FetcherClientOptions) {
    return await fetcherClient<AppNotification[]>("/notifications", options);
}

export async function getUnreadNotificationsCount() {
    return await fetcherClient<{ unreadNotificationsCount: number }>(
        "/notifications/unread_notifications_count"
    );
}

export async function readAllNotifications() {
    return await fetcherClient("/notifications", {
        method: "PATCH"
    });
}

export async function deleteNotification(id: string) {
    return await fetcherClient(`/notifications/${id}`, {
        method: "DELETE"
    });
}

export async function readNotification(id: string) {
    return await fetcherClient(`/notifications/${id}`, {
        method: "PATCH"
    });
}
