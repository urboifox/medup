"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useQueryString from "@/hooks/useQueryString";
import icons from "@/lib/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

export default function ExpertsSearchHeader() {
    const t = useTranslations();
    const { createQueryString, removeQueryString, getQueryString } = useQueryString();

    const timeoutRef = useRef<NodeJS.Timeout>();
    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        if (!value) {
            removeQueryString("q");
            return;
        }
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            createQueryString("q", value);
        }, 300);
    }

    return (
        <header className="flex items-center gap-8 p-4 rounded-lg bg-white shadow-lg shadow-gray-100 border border-light-300">
            <Input
                defaultValue={getQueryString("q") as string}
                onInput={handleSearch}
                placeholder={t("experts.searchPlaceholder")}
                className="border-none w-full"
                containerClassName="flex-1"
            />
            <div className="flex justify-end gap-2 flex-1">
                <Button variant="secondary">
                    <Image src={icons.filters} alt="Filters" width={24} height={24} />
                    {t("common.filters")}
                </Button>
            </div>
        </header>
    );
}
