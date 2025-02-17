"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

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

export async function verifyAccountAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    try {
        await fetcher("/auth/verify_user", {
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

    return { success: true, formData };
}

export async function resendCodeAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    try {
        await fetcher("/auth/verify_user/resend", {
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

    return { success: true, formData };
}

export async function verifyEmailAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    try {
        await fetcher("/auth/password/validate_code", {
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

    return { success: true, formData };
}

export async function forgotPasswordAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    try {
        await fetcher("/auth/password/forgot_password", {
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

    return { success: true, formData };
}

export async function resetPasswordAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    try {
        await fetcher("/auth/password/reset_password", {
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

    return { success: true, formData };
}

export async function basicProfileAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    if ((formData.get("avatar") as File)?.size === 0) formData.delete("avatar");

    try {
        await fetcher("/auth/profile", {
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

    revalidatePath("/profile");
    return { success: true, formData };
}
