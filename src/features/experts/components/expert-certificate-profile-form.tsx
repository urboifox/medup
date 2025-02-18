"use client";
import Button from "@/components/ui/button";
import FileInput from "@/components/ui/file-input";
import Input from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { expertAddCertificateProfileAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";

export default function ExpertCertificateProfileForm() {
    const t = useTranslations();
    const router = useRouter();
    const [state, action, pending] = useActionState(expertAddCertificateProfileAction, {
        success: false,
        formData: new FormData()
    });

    const [file, setFile] = useState<File>();

    useEffect(() => {
        if (state.success) {
            toast.success(t("common.changesSaved"));
            router.push("/profile");
        }
        if (state.message) {
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <form
            className="w-full flex flex-col gap-4"
            action={(fd) => {
                if (file) fd.append("file", file);
                action(fd);
            }}
        >
            <Input
                name="name"
                label={t("labels.certificateName")}
                error={state.errors?.name}
                defaultValue={state.formData?.get("name") as string}
            />
            <Input
                name="date"
                label={t("labels.date")}
                type="date"
                error={state.errors?.date}
                defaultValue={state.formData?.get("date") as string}
            />

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

            <ul className="list-disc ms-4 text-dark-300 text-sm">
                <li>{t("experts.certificate.one")}</li>
                <li>{t("experts.certificate.two")}</li>
                <li>{t("experts.certificate.three")}</li>
            </ul>

            <Button type="submit" disabled={pending}>
                {pending ? t("common.loading") : t("common.submit")}
            </Button>
        </form>
    );
}
