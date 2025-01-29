"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { getErrorMessage } from "@/lib/get-error-message";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";

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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
                label="Email"
                name="email"
                error={errors?.email}
                defaultValue="expert@admin.com"
            />
            <Input
                label="Password"
                name="password"
                type="password"
                error={errors?.password}
                defaultValue="expert"
            />
            <Button type="submit" disabled={loading}>
                {loading ? t("common.loading") : t("auth.login")}
            </Button>
        </form>
    );
}
