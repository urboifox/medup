"use client";

import useQueryString from "@/hooks/useQueryString";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
    currentPage: number;
    lastPage: number;
    maxVisible?: number;
    scroll?: boolean;
}
export default function Pagination({
    currentPage = 1,
    lastPage = 1,
    maxVisible: maxVisibleProp = 3,
    scroll = false
}: Props) {
    const t = useTranslations();
    const { createQueryString } = useQueryString(scroll);

    function handleNextPage() {
        createQueryString("page", `${currentPage + 1}`);
    }

    function handlePrevPage() {
        createQueryString("page", `${currentPage - 1}`);
    }

    const getPageNumbers = (
        currentPage: number,
        lastPage: number,
        maxVisible = maxVisibleProp
    ): (number | "...")[] => {
        const halfRange = Math.floor(maxVisible / 2);

        let start = Math.max(1, currentPage - halfRange);
        let end = Math.min(lastPage, currentPage + halfRange);

        if (currentPage <= halfRange) {
            end = Math.min(lastPage, maxVisible);
        } else if (currentPage + halfRange > lastPage) {
            start = Math.max(1, lastPage - maxVisible + 1);
        }

        const pages: (number | "...")[] = [];
        if (start > 1) pages.push(1, "...");
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (end < lastPage) pages.push("...", lastPage);

        return pages;
    };

    const pageNumbers = getPageNumbers(currentPage, lastPage);

    return (
        <div className="flex items-center justify-center sm:justify-between gap-2 w-full py-10">
            <button
                className="items-center gap-1 disabled:cursor-not-allowed disabled:opacity-50 hidden sm:flex"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
            >
                <FiChevronRight className="ltr:rotate-180" /> {t("common.previous")}
            </button>
            <div className="flex gap-2 items-center">
                {pageNumbers.map((page, idx) => {
                    if (page === "...") {
                        return <span key={idx}>...</span>;
                    }
                    return (
                        <button
                            key={idx}
                            className={cn(
                                "p-2 flex items-center justify-center rounded-md font-semibold text-dark-300 transition-colors duration-200 w-10 h-10",
                                page === currentPage && "bg-primary-main text-white"
                            )}
                            onClick={() => {
                                createQueryString("page", page.toString());
                            }}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
            <button
                className="hidden sm:flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleNextPage}
                disabled={currentPage >= lastPage}
            >
                {t("common.next")} <FiChevronLeft className="ltr:rotate-180" />
            </button>
        </div>
    );
}
