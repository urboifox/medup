import AuthProvider from "@/features/auth/provider";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import RealtimeProvider from "./realtime-provider";
import { NotificationsProvider } from "./features/notifications/notifications-provider";

export default async function Providers({
    children,
    messages,
    locale
}: {
    children: React.ReactNode;
    messages: AbstractIntlMessages;
    locale: string;
}) {
    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <AuthProvider>
                <NotificationsProvider />
                <Toaster />
                <RealtimeProvider>{children}</RealtimeProvider>
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
