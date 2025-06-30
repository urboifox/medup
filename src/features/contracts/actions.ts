"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

type ProjectAction = {
    success: boolean;
    formData: FormData;
    errors?: Record<string, string[]>;
    message?: string;
};

export async function openContractAction(
    _prevData: ProjectAction,
    formData: FormData
): Promise<ProjectAction> {
    const t = await getTranslations();

    try {
        if (formData.has("contract_id")) {
            await fetcher("/api/public/contracts/" + formData.get("contract_id"), {
                method: "POST"
            });
        } else {
            await fetcher("/api/public/contracts", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData))
            });
        }
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

    if (formData.has("other_user_id")) {
        revalidatePath(("/messages/" + formData.get("other_user_id")) as string);
    } else {
        revalidatePath("/contracts/" + formData.get("contract_id"));
    }
    return { success: true, formData };
}
