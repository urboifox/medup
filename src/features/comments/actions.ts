"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";
import { AppComment } from "./types";
import { revalidateTag } from "next/cache";

type CommentAction = {
    success: boolean;
    formData?: FormData;
    errors?: Record<string, string[]>;
    message?: string;
};

export async function addCommentAction(
    _prevData: CommentAction,
    formData: FormData
): Promise<CommentAction> {
    const t = await getTranslations();

    try {
        await fetcher<AppComment>("/api/public/comments", {
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

    revalidateTag("comments");
    return { success: true };
}

export async function likeCommentAction(commentId: number) {
    const t = await getTranslations();

    try {
        await fetcher("/api/favorites/toggle", {
            method: "PATCH",
            body: JSON.stringify({ model_id: commentId, model_type: "comment" })
        });
    } catch (error) {
        if (error instanceof FetcherError) {
            console.error("error:", error.data);
            return {
                success: false,
                errors: error.data?.data,
                message: error.data?.message
            };
        }
        return { success: false, message: t("errors.somethingWentWrong") };
    }

    revalidateTag("comments");
    return { success: true };
}
