import AuthProvider from "@/features/auth/provider";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import RealtimeProvider from "./realtime-provider";

export default function Providers({
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
                <Toaster />
                <RealtimeProvider>{children}</RealtimeProvider>
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
