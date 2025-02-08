"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { resetPasswordAction } from "../actions";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";

export default function ResetPasswordForm() {
    const t = useTranslations();
    const router = useRouter();
    const [state, action, pending] = useActionState(resetPasswordAction, {
        success: false,
        formData: new FormData()
    });

    const searchParams = useSearchParams();
    const handle = searchParams.get("handle") || "";
    const code = searchParams.get("code") || "";

    useEffect(() => {
        if (state.success) {
            toast.success(t("auth.passwordResetSuccess"));
            router.push("/login");
        }
        if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <>
            <form action={action} className="w-full flex flex-col gap-4">
                <input type="hidden" name="handle" value={handle} />
                <input type="hidden" name="code" value={code} />

                <Input
                    defaultValue={state.formData?.get("password") as string}
                    error={state.errors?.password}
                    type="password"
                    label={t("labels.password")}
                    name="password"
                    placeholder="********"
                />
                <Input
                    defaultValue={state.formData?.get("password_confirmation") as string}
                    error={state.errors?.password_confirmation}
                    type="password"
                    label={t("labels.confirmPassword")}
                    name="password_confirmation"
                    placeholder="********"
                />

                <Button type="submit" disabled={pending}>
                    {t(pending ? "common.loading" : "common.continue")}
                </Button>
                <Link href="/login" className="w-full">
                    <Button className="w-full" variant="secondary">
                        {t("auth.login")} {t("common.instead")}
                    </Button>
                </Link>
            </form>
        </>
    );
}
