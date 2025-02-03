import AuthProvider from "@/features/auth/provider";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import SelectMenuProvider from "@/features/select-menu/select-menu-provider";

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
                <SelectMenuProvider>
                    <Toaster />
                    {children}
                </SelectMenuProvider>
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
