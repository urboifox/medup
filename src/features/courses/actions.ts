"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";
import { Course } from "./types";

type CourseAction = {
    success: boolean;
    formData: FormData;
    errors?: Record<string, string[]>;
    message?: string;
};

export async function addCourseAction(
    _prevData: CourseAction,
    formData: FormData
): Promise<CourseAction> {
    const t = await getTranslations();

    if ((formData.get("file") as File)?.size === 0) formData.delete("file");
    if ((formData.get("cover") as File)?.size === 0) formData.delete("cover");

    try {
        await fetcher<Course>("/api/public/courses", {
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
