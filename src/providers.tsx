import AuthProvider from "@/features/auth/provider";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import SelectMenuProvider from "@/features/select-menu/select-menu-provider";
import { Suspense } from "react";

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
                <Suspense>
                    <SelectMenuProvider />
                </Suspense>
                <Toaster />
                {children}
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
