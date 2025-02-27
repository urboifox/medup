import FilterItem from "./sidebar-filter-item";
import { CollegeWithSpeciality } from "@/features/select-menu/types";
import { useTranslations } from "next-intl";

interface Props {
    filters: CollegeWithSpeciality[];
}

export default function SpecialitiesPageFilter({ filters }: Props) {
    const t = useTranslations();

    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="font-semibold text-2xl">{t("common.colleges")}</h2>
            <div className="flex flex-col gap-4">
                {filters?.map((filter) => <FilterItem key={filter.id} filter={filter} />)}
            </div>
        </div>
    );
}
