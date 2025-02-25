"use client";
import { CollegeWithSpeciality, Speciality } from "@/features/select-menu/types";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { FaCheck, FaChevronRight } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import useQueryString from "@/hooks/useQueryString";
import { useTranslations } from "next-intl";

export default function SpecialitiesPageFilter({ filters }: { filters: CollegeWithSpeciality[] }) {
    const t = useTranslations();

    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="font-semibold text-2xl">{t("common.colleges")}</h2>
            <div className="flex flex-col gap-4">
                {filters.map((filter) => (
                    <FilterItem key={filter.id} filter={filter} />
                ))}
            </div>
        </div>
    );
}

function FilterItem({ filter }: { filter: CollegeWithSpeciality }) {
    const { createQueryString, removeQueryString, getQueryString } = useQueryString();
    const [open, setOpen] = useState(false);

    const searchParamsSpecialities = getQueryString("specialities") || "";
    const selectedSpecialities = searchParamsSpecialities
        ? searchParamsSpecialities?.split(",")
        : [];
    const hasSelectedInside = selectedSpecialities.some((id) =>
        filter.specialities.some((s) => s.id.toString() === id)
    );

    function handleToggle() {
        setOpen(!open);
    }

    function handleSpecialityClick(speciality: Speciality) {
        const isSelected = selectedSpecialities.includes(speciality.id.toString());
        if (isSelected) {
            if (selectedSpecialities.length <= 1) {
                removeQueryString("specialities");
            } else {
                const newSpecialities = selectedSpecialities.filter(
                    (id) => id !== speciality.id.toString()
                );
                createQueryString("specialities", newSpecialities.join(","));
            }
        } else {
            const newSpecialities = [...selectedSpecialities, speciality.id.toString()];
            createQueryString("specialities", newSpecialities.join(","));
        }
    }

    return (
        <div className="flex flex-col gap-2 overflow-hidden">
            <button
                className={cn(
                    "text-lg flex items-center justify-between w-full text-dark-400 group",
                    hasSelectedInside && "text-primary-main"
                )}
                onClick={handleToggle}
            >
                {filter.name}{" "}
                <span
                    className={cn(
                        "transition-all duration-200 rtl:rotate-180",
                        open && "rotate-90 rtl:rotate-90"
                    )}
                >
                    <FaChevronRight strokeWidth={0.1} size={16} />
                </span>
            </button>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                className="flex flex-col gap-2"
            >
                {filter.specialities.map((speciality) => {
                    const isSelected = selectedSpecialities.includes(speciality.id.toString());

                    return (
                        <div key={speciality.id} className="flex items-center gap-2 ps-4">
                            <button
                                onClick={() => handleSpecialityClick(speciality)}
                                className={cn(
                                    "text-dark-300 text-sm transition-colors duration-200 flex items-center gap-2 w-full",
                                    isSelected ? "text-primary-main" : "hover:text-dark-400"
                                )}
                            >
                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "fit-content" }}
                                            exit={{ opacity: 0, width: 0 }}
                                        >
                                            <FaCheck />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {speciality.name}
                            </button>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
