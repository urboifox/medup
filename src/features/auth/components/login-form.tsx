"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { getErrorMessage } from "@/lib/get-error-message";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";

export default function LoginForm() {
    const t = useTranslations();
    const router = useRouter();

    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);
    const loginState = useAuthStore((state) => state.login);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setErrors({});
        setLoading(true);

        await fetch("/api/login", {
            method: "POST",
            body: formData
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    console.error(data);
                    if (data?.data) {
                        setErrors(data.data);
                    }
                    throw new Error(data?.message);
                }
                return data;
            })
            .then((data) => {
                loginState(data?.data?.token, data?.data?.user);
                router.push("/");
            })
            .catch((error) => {
                const message = getErrorMessage(error);
                if (message) {
                    toast.error(message);
                } else {
                    toast.error(t("errors.somethingWentWrong"));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
            <Input
                label="Email"
                name="email"
                error={errors?.email}
                defaultValue="expert@admin.com"
            />
            <div className="flex flex-col gap-1 items-end w-full">
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    error={errors?.password}
                    defaultValue="expert"
                />
                <Link
                    href="/forgot-password"
                    className="text-sm text-dark-300 hover:text-black transition-colors duration-200"
                >
                    {t("auth.forgotPassword")}
                </Link>
            </div>
            <Button type="submit" disabled={loading} className="mt-4">
                {loading ? t("common.loading") : t("auth.login")}
            </Button>
            <p className="text-center">
                {t("auth.dontHaveAnAccount")}{" "}
                <Link href="/register" className="text-primary-main">
                    {t("auth.register")}
                </Link>
            </p>
        </form>
    );
}
