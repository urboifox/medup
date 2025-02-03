"use client";
import Radio from "@/components/ui/radio";
import useQueryString from "@/hooks/useQueryString";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";
import ExpertsSearchFilters from "./experts-search-filters";

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
        <div className="flex flex-col gap-6">
            <header className="flex items-center lg:gap-8 px-4 lg:h-20 rounded-lg bg-white border border-light-300 shadow-lg shadow-light-200 flex-col lg:flex-row">
                <div className="flex items-center gap-2 w-full h-full max-lg:border-b lg:border-e border-light-300">
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
                <div className="flex items-center gap-2 w-full h-full max-lg:border-b lg:border-e border-light-300">
                    <span className="text-primary-main">
                        <LuMapPin size={26} />
                    </span>
                    <input
                        defaultValue={getQueryString("location") as string}
                        onInput={(e) => handleQuery(e, "location")}
                        placeholder={t("experts.locationSearchPlaceholder")}
                        className="focus:outline-none w-full h-full py-5 lg:py-0"
                    />
                </div>
                <div className="flex items-center gap-2 max-lg:py-5 flex-col sm:flex-row">
                    <Radio
                        name="is_premium"
                        label={t("experts.premiumExperts")}
                        defaultChecked
                        value="1"
                        onChange={(e) => handleQuery(e, "is_premium")}
                    />
                    <Radio
                        name="is_premium"
                        label={t("experts.allExperts")}
                        value="0"
                        onChange={(e) => handleQuery(e, "is_premium")}
                    />
                </div>
            </header>
            <ExpertsSearchFilters />
        </div>
    );
}
