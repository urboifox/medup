"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Idea } from "./types";

type IdeaAction = {
    success: boolean;
    formData: FormData;
    errors?: Record<string, string[]>;
    message?: string;
};

export async function addIdeaAction(
    _prevData: IdeaAction,
    formData: FormData
): Promise<IdeaAction> {
    const t = await getTranslations();

    try {
        await fetcher<Idea>("/api/public/ideas", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries()))
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

    redirect("/ideas");
}
