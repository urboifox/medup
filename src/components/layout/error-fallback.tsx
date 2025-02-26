"use client";
import { useTranslations } from "next-intl";
import { FallbackProps } from "react-error-boundary";
import Button from "../ui/button";

export default function ErrorFallback(props: FallbackProps) {
    const t = useTranslations();

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-14">
            <h1 className="text-2xl font-semibold">{t("errors.somethingWentWrong")}</h1>
            <p className="text-dark-300">{props.error.message}</p>
            <Button onClick={props.resetErrorBoundary}>{t("common.retry")}</Button>
        </div>
    );
}
