"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import { User } from "@/types/user";
import { basicProfileAction } from "../actions";

export default function BasicProfileForm({ user }: { user: User }) {
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter();

    const [state, action, pending] = useActionState(basicProfileAction, {
        success: false,
        formData: new FormData()
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    useEffect(() => {
        if (state.success) {
            toast.success(t("common.changesSaved"));
        }
        if (state.message) {
            toast.error(state.message);
        }
    }, [state, router, t]);

    return (
        <form
            className="w-full flex flex-col gap-4"
            action={(formData) => {
                if (avatarFile) formData.set("avatar", avatarFile);
                action(formData);
            }}
        >
            <div className="flex items-center gap-4 mb-4">
                <Image
                    src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar}
                    alt={user.name}
                    width={200}
                    height={200}
                    className="rounded-2xl aspect-square object-cover"
                />
                <div className="flex flex-col gap-4">
                    <p className="text-dark-400 text-xl font-medium max-w-xs">{user.name}</p>
                    <label className="w-fit">
                        <div className="cursor-pointer w-fit p-4 rounded-lg border border-dark-200 transition-colors duration-200 hover:border-primary-main hover:text-primary-main">
                            {t("common.changeImage")}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            name="avatar"
                            onChange={(e) => setAvatarFile(e.target.files?.[0] as File)}
                        />
                    </label>
                </div>
            </div>
            <input type="hidden" name="type" value={pathname.includes("researcher") ? "4" : "1"} />
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Input
                    label={t("labels.firstName")}
                    placeholder={t("placeholders.firstName")}
                    name="first_name"
                    defaultValue={(state.formData?.get("first_name") as string) || user.first_name}
                    error={state.errors?.first_name}
                />
                <Input
                    label={t("labels.middleName")}
                    placeholder={t("placeholders.middleName")}
                    name="middle_name"
                    defaultValue={
                        (state.formData?.get("middle_name") as string) || user.middle_name
                    }
                    error={state.errors?.middle_name}
                />
            </div>
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Input
                    label={t("labels.email")}
                    placeholder={t("placeholders.email")}
                    name="email"
                    defaultValue={(state.formData?.get("email") as string) || user.email}
                    error={state.errors?.email}
                />
                <Input
                    label={t("labels.phone")}
                    placeholder={t("placeholders.phone")}
                    name="phone"
                    defaultValue={(state.formData?.get("phone") as string) || user.phone}
                    error={state.errors?.phone}
                />
            </div>

            <Button type="submit" disabled={pending}>
                {pending ? t("common.loading") : t("common.save")}
            </Button>
        </form>
    );
}
