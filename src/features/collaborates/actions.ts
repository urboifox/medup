"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Collaborate } from "./types";

type ProjectAction = {
    success: boolean;
    formData: FormData;
    errors?: Record<string, string[]>;
    message?: string;
};

export async function addProjectAction(
    _prevData: ProjectAction,
    formData: FormData
): Promise<ProjectAction> {
    const t = await getTranslations();

    let collaborate: Collaborate | undefined;
    try {
        const res = await fetcher<Collaborate>("/api/public/collaborates", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        });
        collaborate = res.data;
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

    redirect("/collaborates");
}
