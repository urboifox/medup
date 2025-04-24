import { useNotificationsStore } from "@/features/notifications/store";
import DropdownButton from "../ui/dropdown-button";
import { GoBell } from "react-icons/go";

export default function NavNotifications() {
    return (
        <DropdownButton menu={<NotificationsDropdownMenu />}>
            <GoBell size={24} />
        </DropdownButton>
    );
}

export function NotificationsDropdownMenu() {
    const notifications = useNotificationsStore((state) => state.notifications);

    return (
        <ul className="p-4 rounded-lg bg-white shadow-lg flex flex-col gap-2 sm:min-w-80">
            {notifications.map((notification, idx) => (
                <li key={idx}>
                    <span>{notification.title}</span>
                </li>
            ))}
        </ul>
    );
}
