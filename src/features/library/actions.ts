"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { LibraryItem } from "./types";

type LibraryAction = {
    success: boolean;
    formData: FormData;
    errors?: Record<string, string[]>;
    message?: string;
};

export async function addLibraryItemAction(
    _prevData: LibraryAction,
    formData: FormData
): Promise<LibraryAction> {
    const t = await getTranslations();

    let libraryItem: LibraryItem | undefined;
    try {
        const res = await fetcher<LibraryItem>("/api/public/library", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        });
        libraryItem = res.data;
    } catch (error) {
        if (error instanceof FetcherError) {
            console.error("error:", error.data);
            return {
                success: false,
                formData,
                errors: error.data?.data,
                message: error.data?.message
            };
        }
        return { success: false, formData, message: t("errors.somethingWentWrong") };
    }

    redirect("/library");
}
