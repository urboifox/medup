"use client";
import FilterItem from "./sidebar-filter-item";
import { CollegeWithSpeciality } from "@/features/select-menu/types";
import { useTranslations } from "next-intl";
import Button from "../ui/button";
import { Link, usePathname } from "@/i18n/routing";

interface Props {
    filters: CollegeWithSpeciality[];
}

export default function SpecialitiesPageFilter({ filters }: Props) {
    const t = useTranslations();
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="font-semibold text-2xl">{t("common.filters")}</h2>
            <div className="flex flex-col gap-4">
                {filters?.map((filter) => <FilterItem key={filter.id} filter={filter} />)}
            </div>
            <Link href={pathname} className="w-full">
                <Button size="sm" variant="secondary" className="w-full">
                    {t("common.clearAll")}
                </Button>
            </Link>
        </div>
    );
}
