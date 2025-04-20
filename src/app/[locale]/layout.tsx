import type { Metadata } from "next";
import { Tajawal, Poppins } from "next/font/google";
import { getMessages, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import Providers from "@/providers";
import "./globals.css";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SelectMenuProvider from "@/features/select-menu/select-menu-provider";

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
    title: "Medup",
    description: "Medup"
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
                <Suspense>
                    <SelectMenuProvider />
                </Suspense>
                <Providers locale={locale} messages={messages}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
