"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

export async function makeOrderAction(_prevData: unknown, formData: FormData) {
    const t = await getTranslations();

    const payload = {
        id: formData.get("id"),
        type: formData.get("type")
    };

    try {
        await fetcher("/api/public/orders", {
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

    revalidateTag("orders");
    return { success: true, formData };
}

export async function rateOrderAction(_prevData: unknown, formData: FormData) {
    const t = await getTranslations();

    const orderId = formData.get("orderId");

    const payload = {
        rating: formData.get("rating"),
        description: formData.get("description")
    };

    try {
        await fetcher("/api/public/orders/" + orderId + "/review", {
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
