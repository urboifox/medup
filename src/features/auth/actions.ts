"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";

type RegisterAction = {
    success: boolean;
    formData: FormData;
    errors?: Record<string, string[]>;
    message?: string;
};

export async function expertRegisterAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    const skills = formData.getAll("skills");
    skills.forEach((skill) => {
        formData.append("skills[]", skill);
    });

    try {
        await fetcher("/auth/register/expert", {
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

export async function studentRegisterAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    try {
        await fetcher("/auth/register/student", {
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
