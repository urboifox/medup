"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/utils/cn";
import { forgotPasswordAction, verifyEmailAction } from "../actions";

export default function VerifyEmailForm() {
    const t = useTranslations();
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("handle") || "";

    const [timer, setTimer] = useState(60);

    const [verifyState, verifyAction, verifyPending] = useActionState(verifyEmailAction, {
        success: false,
        formData: new FormData()
    });
    const [resendState, resendAction, resendPending] = useActionState(forgotPasswordAction, {
        success: false,
        formData: new FormData()
    });

    useEffect(() => {
        if (verifyState.success) {
            router.push(
                `/forgot-password/reset?handle=${email}&code=${verifyState.formData?.get("code")}`
            );
        }
        if (!verifyState.success && verifyState.message) {
            toast.error(verifyState.message);
        }
    }, [verifyState]);

    useEffect(() => {
        if (resendState.success) {
            setTimer(60);
        }
        if (!resendState.success && resendState.message) {
            toast.error(resendState.message);
        }
    }, [resendState]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <form className="flex flex-col gap-4 w-full" action={verifyAction}>
                <input type="hidden" name="handle" value={email} />
                <Input
                    label={t("labels.code")}
                    name="code"
                    placeholder={t("placeholders.code")}
                    defaultValue={verifyState.formData?.get("code") as string}
                    error={verifyState.errors?.code}
                />

                <Button disabled={verifyPending}>
                    {t(verifyPending ? "common.loading" : "common.submit")}
                </Button>
                <Link href="/login" className="w-full">
                    <Button className="w-full" variant="secondary">
                        {t("auth.login")} {t("common.instead")}
                    </Button>
                </Link>
            </form>
            <form action={resendAction}>
                <input type="hidden" name="handle" value={email} />
                <p className="text-sm text-center">
                    {t("auth.didntRecieveCode")}{" "}
                    <button
                        disabled={resendPending}
                        className={cn(
                            "font-semibold",
                            timer > 0 ? "text-gray-500 cursor-wait" : "text-primary-main underline",
                            resendPending ? "cursor-wait opacity-50" : ""
                        )}
                    >
                        {t("auth.resend")}
                    </button>{" "}
                    {timer > 0 && <span className="text-gray-400 font-semibold">({timer})</span>}
                </p>
            </form>
        </>
    );
}
