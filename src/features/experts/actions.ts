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

export async function expertBasicProfileAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    const skills = formData.getAll("skills");
    skills.forEach((skill) => {
        formData.append("skills[]", skill);
    });

    if ((formData.get("cv") as File)?.size === 0) formData.delete("cv");

    try {
        await fetcher("/api/experts/me", {
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

export async function expertExperienceProfileAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    try {
        await fetcher("/api/experts/experiences", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData))
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

export async function expertEditExperienceProfileAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();
    const id = formData.get("id") as string;

    try {
        await fetcher("/api/experts/experiences/" + id, {
            method: "PUT",
            body: JSON.stringify(Object.fromEntries(formData))
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

export async function expertDeleteExperienceProfileAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();
    const id = formData.get("id") as string;

    try {
        await fetcher("/api/experts/experiences/" + id, {
            method: "DELETE",
            body: JSON.stringify(Object.fromEntries(formData))
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

export async function expertAddCertificateProfileAction(
    _prevData: RegisterAction,
    formData: FormData
): Promise<RegisterAction> {
    const t = await getTranslations();

    try {
        await fetcher("/api/experts/certification", {
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

export async function upgradeToPremiumAction(_prevData: unknown) {
    const t = await getTranslations();

    try {
        await fetcher("/api/experts/me/subscription/renew", { method: "POST" });
    } catch (error) {
        if (error instanceof FetcherError) {
            console.error("error:", error.data);
            return {
                success: false,
                message: error.data?.message
            };
        }
        return { success: false, message: t("errors.somethingWentWrong") };
    }

    revalidatePath("/profile");
    return { success: true };
}

export async function reviewExpertAction(_prevData: unknown, formData: FormData) {
    const t = await getTranslations();

    const expertId = formData.get("expertId");

    const payload = {
        rating: formData.get("rating"),
        description: formData.get("description")
    };

    try {
        await fetcher("/api/public/experts/" + expertId + "/review", {
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

    return { success: true, formData };
}
