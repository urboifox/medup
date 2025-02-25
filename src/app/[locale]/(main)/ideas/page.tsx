import PageSearch from "@/components/layout/page-search";
import SpecialitiesPageFilter from "@/components/layout/specialities-page-filter";
import Button from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getCollegesWithSpecialities } from "@/services/select-menu";
import { getTranslations } from "next-intl/server";

export default async function IdeasPage() {
    const t = await getTranslations();
    const { data: filters } = await getCollegesWithSpecialities();

    return (
        <div className="container flex flex-col gap-8 py-14">
            <div className="flex items-center gap-4 flex-col-reverse max-md:items-start md:flex-row">
                <PageSearch />
                <Link href="/ideas/add">
                    <Button className="w-max">+ {t("ideas.addIdea")}</Button>
                </Link>
            </div>

            <div className="flex items-start gap-8">
                <SpecialitiesPageFilter filters={filters || []} />
            </div>
        </div>
    );
}
