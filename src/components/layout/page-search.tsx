"use client";
import useQueryString from "@/hooks/useQueryString";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { CiSearch } from "react-icons/ci";

export default function PageSearch({ children }: { children?: React.ReactNode }) {
    const { getQueryString, createQueryString, removeQueryString } = useQueryString();
    const t = useTranslations();
    const timeoutRef = useRef<NodeJS.Timeout>();

    function handleQuery(event: React.FormEvent<HTMLInputElement>, name = "handle") {
        const value = event.currentTarget.value;
        if (!value) {
            removeQueryString(name);
            return;
        }
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            createQueryString(name, value);
        }, 300);
    }

    return (
        <header className="w-full flex items-center lg:gap-8 px-4 lg:h-20 rounded-lg bg-white border border-light-300 shadow-lg shadow-light-200 flex-col lg:flex-row">
            <div
                className={cn(
                    "flex items-center gap-2 w-full h-full",
                    children && "max-lg:border-b lg:border-e border-light-300"
                )}
            >
                <span className="text-primary-main">
                    <CiSearch size={26} strokeWidth={0.6} />
                </span>
                <input
                    defaultValue={getQueryString("handle") as string}
                    onInput={handleQuery}
                    placeholder={t("experts.searchPlaceholder")}
                    className="focus:outline-none w-full h-full py-5 lg:py-0"
                />
            </div>
            {children && (
                <div className="flex justify-end gap-2 flex-1 max-lg:pb-5 w-full">{children}</div>
            )}
        </header>
    );
}
