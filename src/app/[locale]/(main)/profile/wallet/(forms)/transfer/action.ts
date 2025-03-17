"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

export async function transferAction(prevState: unknown, formData: FormData) {
    const t = await getTranslations();
    const payload = Object.fromEntries(formData) as Record<string, string>;

    try {
        await fetcher("/api/wallet/transfer", {
            method: "POST",
            body: JSON.stringify(payload)
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

    revalidateTag("wallet");
    return { success: true };
}
