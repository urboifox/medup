import { create } from "zustand";
import { deleteNotification, readAllNotifications, readNotification } from "./services";
import { AppNotification } from "./types";

interface NotificationsStore {
    notifications: AppNotification[];
    unseenCount: number;
    setNotifications: (notifications: AppNotification[]) => void;
    add: (notification: AppNotification) => void;
    delete: (id: string) => Promise<void>;
    read: (id: string) => Promise<void>;
    readAll: () => Promise<void>;
    clear: () => void;
}

export const useNotificationsStore = create<NotificationsStore>((set, get) => ({
    notifications: [],
    unseenCount: 0,

    setNotifications: (notifications: AppNotification[]) => {
        const unseenCount = notifications.filter((n) => !n.seen).length;
        set({ notifications, unseenCount });
    },

    add: (notification) => {
        set((state) => ({
            notifications: [notification, ...state.notifications],
            unseenCount: notification.seen ? state.unseenCount : state.unseenCount + 1
        }));
    },

    delete: async (id) => {
        const { notifications, unseenCount } = get();
        const notification = notifications.find((n) => n.id === id);
        const updatedNotifications = notifications.filter((n) => n.id !== id);
        const updatedUnseen = !notification?.seen ? unseenCount - 1 : unseenCount;

        set({ notifications: updatedNotifications, unseenCount: updatedUnseen });

        try {
            await deleteNotification(id);
        } catch {
            set({ notifications, unseenCount });
        }
    },

    read: async (id) => {
        const { notifications } = get();
        const updatedNotifications = notifications.map((n) =>
            n.id === id ? { ...n, seen: true } : n
        );
        set({ notifications: updatedNotifications });

        try {
            await readNotification(id);
        } catch {
            set({ notifications });
        }
    },

    readAll: async () => {
        const { notifications } = get();
        const updatedNotifications = notifications.map((n) => ({ ...n, seen: true }));
        set({ notifications: updatedNotifications });

        try {
            await readAllNotifications();
        } catch {
            set({ notifications });
        }
    },

    clear: () => {
        set({ notifications: [], unseenCount: 0 });
    }
}));
