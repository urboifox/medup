import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import Providers from "@/providers";
import "./globals.css";

const tajawal = Tajawal({
    weight: ["300", "500", "700"],
    subsets: ["latin", "arabic"],
    variable: "--font-tajawal",
    display: "swap"
});

export const metadata: Metadata = {
    title: "Medup Skills",
    description: "Medup Skills"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl">
            <body className={`${tajawal.variable} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
