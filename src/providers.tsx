import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import { User } from "./types/types";
import AuthProvider from "./features/auth/provider";

export default function Providers({
    children,
    messages,
    user,
    token
}: {
    children: React.ReactNode;
    messages: AbstractIntlMessages;
    user: User | null;
    token: string | null;
}) {
    return (
        <NextIntlClientProvider messages={messages}>
            <AuthProvider user={user} token={token}>
                <Toaster />
                {children}
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
