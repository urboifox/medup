"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { forgotPasswordAction } from "../actions";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";

export default function ForgotPasswordForm() {
    const t = useTranslations();
    const router = useRouter();
    const [state, action, pending] = useActionState(forgotPasswordAction, {
        success: false,
        formData: new FormData()
    });

    useEffect(() => {
        if (state.success) {
            router.push("/forgot-password/verify?handle=" + state.formData?.get("handle"));
        }
        if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <>
            <form action={action} className="w-full flex flex-col gap-4">
                <Input
                    defaultValue={state.formData?.get("email") as string}
                    error={state.errors?.email}
                    label={t("labels.email")}
                    name="handle"
                    placeholder={t("placeholders.email")}
                />

                <Button type="submit" disabled={pending}>
                    {t(pending ? "common.loading" : "common.continue")}
                </Button>
                <Link href="/login" className="w-full">
                    <Button className="w-full" variant="secondary" size="sm">
                        {t("auth.login")} {t("common.instead")}
                    </Button>
                </Link>
            </form>
        </>
    );
}
