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
import { addLibraryItemAction } from "../actions";
import FileInput from "@/components/ui/file-input";
import { FaFilePdf, FaImage } from "react-icons/fa6";
import Checkbox from "@/components/ui/checkbox";

export default function AddLibrarryItemForm() {
    const t = useTranslations();
    const router = useRouter();
    const [state, action, pending] = useActionState(addLibraryItemAction, {
        success: false,
        formData: new FormData()
    });

    const [acceptTerms, setAcceptTerms] = useState(false);

    const [cover, setCover] = useState<File>();
    const [file, setFile] = useState<File>();

    const specialities = useSelectMenuStore((state) => state.specialities);

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
                if (!acceptTerms) {
                    toast.error(t("errors.acceptTerms"));
                    return;
                }
                if (cover) formData.set("cover", cover);
                if (file) formData.set("file", file);
                action(formData);
            }}
            className="flex flex-col gap-4 w-full"
        >
            <Input
                label={t("labels.title")}
                name="title"
                defaultValue={state.formData?.get("title") as string}
                error={state.errors?.title}
            />
            <Input
                label={t("common.price")}
                name="price"
                defaultValue={state.formData?.get("price") as string}
                error={state.errors?.price}
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

            <FileInput
                accept="application/pdf"
                onFilesChange={(files) => setFile(files[0])}
                error={state.errors?.file}
                name="file"
                label={t("labels.file")}
                placeholderIcon={
                    <span className="text-primary-main text-xl">
                        <FaFilePdf />
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

            <div className="my-4">
                <Checkbox
                    label={t("common.bookTerms")}
                    name="terms"
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    checked={acceptTerms}
                />
            </div>

            <Button type="submit" disabled={pending}>
                {pending ? t("common.loading") : t("common.submit")}
            </Button>
        </form>
    );
}
