import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

export default function Providers({
    children,
    messages
}: {
    children: React.ReactNode;
    messages: AbstractIntlMessages;
}) {
    return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
