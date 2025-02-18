"use client";

import { useActionState, useEffect, useState } from "react";
import { addArticleAction } from "../actions";
import Button from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Input from "@/components/ui/input";
import FileInput from "@/components/ui/file-input";
import { FaFilePdf } from "react-icons/fa6";
import Textarea from "@/components/ui/textarea";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import MultiSelect from "@/components/ui/multi-select";
import { useSelectMenuStore } from "@/features/select-menu/store";

export default function AddArticleForm() {
    const t = useTranslations();
    const router = useRouter();
    const [state, action, pending] = useActionState(addArticleAction, {
        success: false,
        formData: new FormData()
    });

    const [file, setFile] = useState<File>();

    const skills = useSelectMenuStore((state) => state.skills);

    useEffect(() => {
        if (state.success) {
            toast.success(t("articles.articleAdded"));
            router.push("/articles");
        }
        if (state.message) {
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <form
            action={(fd) => {
                if (file) fd.append("file", file);
                action(fd);
            }}
            className="flex flex-col gap-4 w-full"
        >
            <FileInput
                error={state.errors?.file}
                accept="application/pdf"
                onFilesChange={(files) => setFile(files[0])}
                name="file"
                label={t("labels.file")}
                placeholderIcon={
                    <span className="text-primary-main text-xl">
                        <FaFilePdf />
                    </span>
                }
            />
            <Input
                label={t("labels.title")}
                name="title"
                defaultValue={state.formData?.get("title") as string}
                error={state.errors?.title}
            />
            <MultiSelect
                error={state.errors?.skills}
                name="skills"
                options={skills.map((skill) => ({ label: skill.name, value: skill.id.toString() }))}
                label={t("labels.skills")}
            />
            <Input
                label={t("labels.contributors")}
                name="contributors"
                placeholder="Ahmed Sameh, Mohamed Ali, ..."
                defaultValue={state.formData?.get("contributors") as string}
                error={state.errors?.contributors}
            />
            <Input
                label={t("labels.orcidNumber")}
                name="orcid_number"
                defaultValue={state.formData?.get("orcid_number") as string}
                error={state.errors?.orcid_number}
            />
            <Textarea
                label={t("labels.notes")}
                name="notes"
                defaultValue={state.formData?.get("notes") as string}
                error={state.errors?.notes}
                className="min-h-32"
            />

            <Button type="submit" disabled={pending}>
                {pending ? t("common.loading") : t("common.submit")}
            </Button>
        </form>
    );
}
