"use client";
import Button from "@/components/ui/button";
import { API_URL } from "@/constants";
import { useAuthStore } from "@/features/auth/store";
import { LibraryItem } from "@/features/library/types";
import { useTranslations } from "next-intl";

export default function BookDownloadButton({ book }: { book: LibraryItem }) {
    const t = useTranslations();
    const token = useAuthStore((state) => state.token);

    async function handleDownload() {
        const res = await fetch(API_URL + "/api/book_sources/" + book.id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = book.title + ".pdf";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <>
            <Button onClick={handleDownload} className="w-fit">
                {t("common.download")}
            </Button>
        </>
    );
}
