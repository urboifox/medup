"use client";

import { useActionState, useEffect } from "react";
import Button from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { useSelectMenuStore } from "@/features/select-menu/store";
import Select from "@/components/ui/select";
import { addLibraryItemAction } from "../actions";

export default function AddLibrarryItemForm() {
    const t = useTranslations();
    const router = useRouter();
    const [state, action, pending] = useActionState(addLibraryItemAction, {
        success: false,
        formData: new FormData()
    });

    const specialities = useSelectMenuStore((state) => state.specialities);

    useEffect(() => {
        if (state.message && !state.success) {
            toast.error(state.message);
        }
    }, [state, router, t]);

    return (
        <form action={action} className="flex flex-col gap-4 w-full">
            <Input
                label={t("labels.title")}
                name="title"
                defaultValue={state.formData?.get("title") as string}
                error={state.errors?.title}
            />
            <Input
                label={t("labels.orcidNumber")}
                name="orcid_number"
                defaultValue={state.formData?.get("orcid_number") as string}
                error={state.errors?.orcid_number}
            />
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
