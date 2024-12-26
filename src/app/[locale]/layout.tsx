import type { Metadata } from "next";
import { Tajawal, Poppins } from "next/font/google";
import { getMessages, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import Providers from "@/providers";
import "./globals.css";
import { notFound } from "next/navigation";

const tajawal = Tajawal({
    weight: ["300", "500", "700"],
    subsets: ["arabic"],
    variable: "--font-tajawal",
    display: "swap"
});

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
    display: "swap"
});

export const metadata: Metadata = {
    title: "Medup Skills",
    description: "Medup Skills"
};

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }

    const messages = await getMessages();
    setRequestLocale(locale);

    return (
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            <body className={`${tajawal.variable} ${poppins.variable} antialiased`}>
                <Providers messages={messages}>{children}</Providers>
            </body>
        </html>
    );
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
