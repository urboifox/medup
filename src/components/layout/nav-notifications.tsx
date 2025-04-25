import { useNotificationsStore } from "@/features/notifications/store";
import DropdownButton from "../ui/dropdown-button";
import { GoBell, GoDotFill } from "react-icons/go";
import { useTranslations } from "next-intl";
import { BsEye, BsTrash3 } from "react-icons/bs";
import { cn } from "@/utils/cn";

export default function NavNotifications() {
    return (
        <DropdownButton menu={<NotificationsDropdownMenu />}>
            <GoBell size={24} />
        </DropdownButton>
    );
}

export function NotificationsDropdownMenu() {
    const notifications = useNotificationsStore((state) => state.notifications);
    const markAsRead = useNotificationsStore((state) => state.read);
    const deleteNotification = useNotificationsStore((state) => state.delete);
    const t = useTranslations();

    return (
        <div className="flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{t("common.notifications")}</h3>
                <button className="text-primary-main text-sm">{t("common.markAllAsRead")}</button>
            </div>
            <hr className="border-gray-200" />
            <ul className="flex flex-col gap-2 sm:min-w-80 max-h-96 overflow-y-auto">
                {notifications.length === 0 && (
                    <li className="flex items-center justify-center text-gray-500 text-sm italic">
                        {t("common.noNotifications")}
                    </li>
                )}
                {notifications.map((notification, idx) => (
                    <li key={idx}>
                        <div className="p-2 hover:bg-gray-100 flex items-start justify-between group">
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-1">
                                    <h4
                                        className="text-sm font-medium line-clamp-1"
                                        title={notification.title}
                                    >
                                        {notification.title}
                                    </h4>
                                    <p
                                        className="text-sm text-gray-500 line-clamp-2"
                                        title={notification.body}
                                    >
                                        {notification.body}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={cn(
                                    "flex flex-col gap-2",
                                    notification.seen && "self-center"
                                )}
                            >
                                {notification.seen ? (
                                    <button
                                        className="opacity-0 group-hover:opacity-100 text-error-main"
                                        onClick={() => deleteNotification(notification.id)}
                                    >
                                        <BsTrash3 />
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="opacity-0 group-hover:opacity-100"
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <BsEye />
                                        </button>
                                        <GoDotFill className="text-primary-main" />
                                    </>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
