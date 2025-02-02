"use client";
import Button from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ErrorPage({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations();
    console.log(error);

    return (
        <div className="min-h-screen gap-8 w-full flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl text-center font-bold text-heading">
                    {t("errors.somethingWentWrong")}
                </h1>
                <p className="max-w-lg mx-auto text-center">{error.message}</p>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="secondary" onClick={reset}>
                    {t("common.retry")}
                </Button>
                <Link href="/">
                    <Button>{t("common.goHome")}</Button>
                </Link>
            </div>
        </div>
    );
}
