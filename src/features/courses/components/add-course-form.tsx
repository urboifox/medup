"use client";

import { useActionState, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { useSelectMenuStore } from "@/features/select-menu/store";
import Select from "@/components/ui/select";
import FileInput from "@/components/ui/file-input";
import { FaImage } from "react-icons/fa6";
import { addCourseAction } from "../actions";

export default function AddCourseForm() {
    const t = useTranslations();
    const router = useRouter();
    const [state, action, pending] = useActionState(addCourseAction, {
        success: false,
        formData: new FormData()
    });

    const [cover, setCover] = useState<File>();

    const specialities = useSelectMenuStore((state) => state.specialities);
    const colleges = useSelectMenuStore((state) => state.colleges);

    useEffect(() => {
        if (state.success) {
            toast.success(t("common.itemAddedForReview"));
            router.push("/library");
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, router, t]);

    return (
        <form
            action={(formData) => {
                if (cover) formData.set("cover", cover);
                action(formData);
            }}
            className="flex flex-col gap-4 w-full"
        >
            <Input
                label={t("labels.name")}
                name="name"
                defaultValue={state.formData?.get("name") as string}
                error={state.errors?.name}
            />
            <Input
                label={t("labels.link")}
                name="link"
                defaultValue={state.formData?.get("link") as string}
                error={state.errors?.link}
            />
            <Input
                label={t("common.price")}
                type="number"
                name="price"
                defaultValue={state.formData?.get("price") as string}
                error={state.errors?.price}
            />
            <Select
                label={t("experts.college")}
                error={state.errors?.college_id}
                name="college_id"
                defaultValue={state.formData?.get("college_id") as string}
                key={`${state.formData?.get("college_id") as string}-college`}
            >
                {colleges.map((college) => {
                    return (
                        <option key={college.id} value={college.id}>
                            {college.name}
                        </option>
                    );
                })}
            </Select>
            <Select
                label={t("labels.speciality")}
                error={state.errors?.speciality_id}
                name="speciality_id"
                defaultValue={state.formData?.get("speciality_id") as string}
                key={`${state.formData?.get("speciality_id") as string}-speciality`}
            >
                {specialities.map((speciality) => {
                    return (
                        <option key={speciality.id} value={speciality.id}>
                            {speciality.name}
                        </option>
                    );
                })}
            </Select>

            <FileInput
                accept="image/*"
                onFilesChange={(files) => setCover(files[0])}
                error={state.errors?.cover}
                name="cover"
                label={t("labels.cover")}
                placeholderIcon={
                    <span className="text-primary-main text-xl">
                        <FaImage />
                    </span>
                }
            />

            <Textarea
                label={t("labels.description")}
                name="description"
                defaultValue={state.formData?.get("description") as string}
                error={state.errors?.description}
                className="min-h-32"
            />

            <Button type="submit" disabled={pending}>
                {pending ? t("common.loading") : t("common.submit")}
            </Button>
        </form>
    );
}
