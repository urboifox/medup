"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { resendCodeAction, verifyAccountAction } from "../actions";
import { cn } from "@/utils/cn";

export default function VerifyForm() {
    const t = useTranslations();
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("handle") || "";

    const [timer, setTimer] = useState(60);

    const [verifyState, verifyAction, verifyPending] = useActionState(verifyAccountAction, {
        success: false,
        formData: new FormData()
    });
    const [resendState, resendAction, resendPending] = useActionState(resendCodeAction, {
        success: false,
        formData: new FormData()
    });

    useEffect(() => {
        if (verifyState.success) {
            router.push("/register/verified");
        }
        if (!verifyState.success && verifyState.message) {
            toast.error(verifyState.message);
        }
    }, [verifyState, router]);

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
                <Input label={t("labels.code")} name="code" placeholder={t("placeholders.code")} />

                <Button disabled={verifyPending}>
                    {t(verifyPending ? "common.loading" : "common.submit")}
                </Button>
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
