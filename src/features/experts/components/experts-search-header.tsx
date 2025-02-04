"use client";
import Radio from "@/components/ui/radio";
import useQueryString from "@/hooks/useQueryString";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";
import ExpertsSearchFilters from "./experts-search-filters";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/components/ui/button";
import Image from "next/image";
import icons from "@/lib/icons";

export default function ExpertsSearchHeader() {
    const t = useTranslations();
    const { createQueryString, removeQueryString, getQueryString } = useQueryString();
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

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
                        defaultValue={getQueryString("city") as string}
                        onInput={(e) => handleQuery(e, "city")}
                        placeholder={t("experts.locationSearchPlaceholder")}
                        className="focus:outline-none w-full h-full py-5 lg:py-0"
                    />
                </div>
                <div className="flex items-start sm:items-center gap-2 max-lg:py-5 max-sm:flex-wrap sm:flex-row">
                    <Radio
                        name="only_premium"
                        label={t("experts.premiumExperts")}
                        defaultChecked
                        value="1"
                        onChange={(e) => handleQuery(e, "only_premium")}
                    />
                    <Radio
                        name="only_premium"
                        label={t("experts.allExperts")}
                        value="0"
                        onChange={(e) => handleQuery(e, "only_premium")}
                    />
                </div>
                <div className="flex justify-end gap-2 flex-1 max-lg:pb-5 w-full">
                    <Button
                        variant="secondary"
                        onClick={() => setFiltersVisible(!filtersVisible)}
                        className="w-full"
                    >
                        <Image src={icons.filters} alt="Filters" width={24} height={24} />
                        {t("common.filters")}
                    </Button>
                </div>
            </header>
            <AnimatePresence initial={false}>
                {filtersVisible && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onAnimationStart={() => setIsAnimating(true)}
                        onAnimationComplete={() => setIsAnimating(false)}
                        className={isAnimating ? "overflow-hidden" : "overflow-visible"}
                    >
                        <ExpertsSearchFilters />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
