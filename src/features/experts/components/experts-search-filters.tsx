"use client";
import DropdownButton from "@/components/ui/dropdown-button";
import { useTranslations } from "next-intl";
import { FaChevronDown, FaX } from "react-icons/fa6";
import ExpertsFiltersMenu from "./experts-filters-menu";
import { useSelectMenuStore } from "@/features/select-menu/store";
import { useSearchParams } from "next/navigation";
import { BaseEntity } from "@/types";
import useQueryString from "@/hooks/useQueryString";

interface FilterConfig {
    queryName: string;
    options: (BaseEntity & { experts_count?: number })[];
    selected: number[] | null;
    defaultText: string;
}

export default function ExpertsSearchFilters({
    showCountries = false
}: {
    showCountries?: boolean;
}) {
    const t = useTranslations();
    const { removeQueryString } = useQueryString();
    const colleges = useSelectMenuStore((state) => state.colleges);
    const skills = useSelectMenuStore((state) => state.skills);
    const specialities = useSelectMenuStore((state) => state.specialities);
    const countries = useSelectMenuStore((state) => state.countries);

    const searchParams = useSearchParams();

    const getSelectedIds = (param: string | null): number[] | null =>
        param ? param.split(",").map((item) => parseInt(item, 10)) : null;

    const selectedColleges = getSelectedIds(searchParams.get("colleges"));
    const selectedSpecialities = getSelectedIds(searchParams.get("specialities"));
    const selectedSkills = getSelectedIds(searchParams.get("skills"));
    const selectedCountries = getSelectedIds(searchParams.get("countries"));

    const filteredSpecialities = selectedColleges
        ? specialities.filter((item) => selectedColleges.includes(item.college_id ?? 0))
        : specialities;
    const filteredSkills = selectedSpecialities
        ? skills.filter((item) =>
              item.specialities?.some((speciality) => selectedSpecialities?.includes(speciality))
          )
        : skills;

    const filters: FilterConfig[] = [
        {
            queryName: "colleges",
            options: colleges,
            selected: selectedColleges,
            defaultText: t("experts.college")
        },
        {
            queryName: "specialities",
            options: filteredSpecialities,
            selected: selectedSpecialities,
            defaultText: t("experts.speciality")
        },
        {
            queryName: "skills",
            options: filteredSkills,
            selected: selectedSkills,
            defaultText: t("experts.skill")
        },
        {
            queryName: "countries",
            options: countries,
            selected: selectedCountries,
            defaultText: t("labels.country")
        }
    ];

    const renderDropdown = ({ queryName, options, selected, defaultText }: FilterConfig) => {
        const displayText = selected
            ? options
                  .filter((item) => selected.includes(item.id))
                  .map((item) => item.name)
                  .join(", ")
            : defaultText;

        return (
            <DropdownButton
                key={queryName}
                menu={<ExpertsFiltersMenu options={options} queryName={queryName} />}
                containerClassName="flex-1 min-w-72 sm:min-w-80"
                className="rounded-md border border-light-300 p-4 w-full flex-1 flex items-center justify-between text-gray-500 bg-white shadow-lg shadow-light-200"
                activeClassName="border-black/50 text-black"
            >
                <span className="line-clamp-1 text-start">{displayText}</span>
                <div className="flex items-center gap-2">
                    <FaChevronDown size={16} strokeWidth={0.2} />
                    {selected && (
                        <div
                            role="button"
                            className="text-error-main"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeQueryString(queryName);
                            }}
                        >
                            <FaX />
                        </div>
                    )}
                </div>
            </DropdownButton>
        );
    };

    return (
        <div className="flex items-center gap-4 w-full flex-wrap">
            {filters.slice(0, showCountries ? 4 : 3).map((filter) => renderDropdown(filter))}
        </div>
    );
}
