"use client";
import Button from "@/components/ui/button";
import useQueryString from "@/hooks/useQueryString";
import icons from "@/lib/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";

export default function ExpertsSearchHeader() {
    const t = useTranslations();
    const { createQueryString, removeQueryString, getQueryString } = useQueryString();

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
        <header className="flex items-center gap-8 px-4 h-20 rounded-lg bg-white border border-light-300">
            <div className="flex items-center gap-2 w-full h-full border-e border-light-300">
                <span className="text-primary-main">
                    <CiSearch size={26} strokeWidth={0.6} />
                </span>
                <input
                    defaultValue={getQueryString("handle") as string}
                    onInput={handleQuery}
                    placeholder={t("experts.searchPlaceholder")}
                    className="focus:outline-none w-full h-20"
                />
            </div>
            <div className="flex items-center gap-2 w-full h-full">
                <span className="text-primary-main">
                    <LuMapPin size={26} />
                </span>
                <input
                    defaultValue={getQueryString("handle") as string}
                    onInput={(e) => handleQuery(e, "location")}
                    placeholder={t("experts.searchPlaceholder")}
                    className="focus:outline-none w-full h-20"
                />
            </div>
            <div className="flex justify-end gap-2 flex-1">
                <Button variant="secondary">
                    <Image src={icons.filters} alt="Filters" width={24} height={24} />
                    {t("common.filters")}
                </Button>
            </div>
        </header>
    );
}
