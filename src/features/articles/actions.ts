"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";

type ArticleAction = {
    success: boolean;
    formData: FormData;
    errors?: Record<string, string[]>;
    message?: string;
};

export async function addArticleAction(
    _prevData: ArticleAction,
    formData: FormData
): Promise<ArticleAction> {
    const t = await getTranslations();

    if ((formData.get("file") as File)?.size === 0) formData.delete("file");

    try {
        await fetcher("/api/public/researches", {
            method: "POST",
            body: formData,
            skipHeaders: true
        });
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

    return { success: true, formData };
}
