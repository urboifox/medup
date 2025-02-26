import { getTranslations } from "next-intl/server";
import FilterItem from "./sidebar-filter-item";
import { CollegeWithSpeciality } from "@/features/select-menu/types";

interface Props {
    filters: CollegeWithSpeciality[];
}

export default async function SpecialitiesPageFilter({ filters }: Props) {
    const t = await getTranslations();

    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="font-semibold text-2xl">{t("common.colleges")}</h2>
            <div className="flex flex-col gap-4">
                {filters?.map((filter) => <FilterItem key={filter.id} filter={filter} />)}
            </div>
        </div>
    );
}
