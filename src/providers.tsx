import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import AuthProvider from "./features/auth/provider";

export default function Providers({
    children,
    messages
}: {
    children: React.ReactNode;
    messages: AbstractIntlMessages;
}) {
    return (
        <NextIntlClientProvider messages={messages}>
            <AuthProvider>
                <Toaster />
                {children}
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
