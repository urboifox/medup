import ErrorFallback from "@/components/layout/error-fallback";
import SpecialitiesPageFilter from "@/components/layout/specialities-page-filter";
import IdeasContent from "@/features/ideas/components/ideas-content";
import { getCollegesWithSpecialities } from "@/services/select-menu";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PageSearch from "@/components/layout/page-search";
import Button from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import IdeaCardSkeleton from "@/features/ideas/components/idea-card-skeleton";

export default async function IdeasPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const t = await getTranslations();
    const { data: filters } = await getCollegesWithSpecialities();
    const searchParamsData = await searchParams;
    const contentKey = `${searchParamsData?.specialities || ""}-${searchParamsData?.handle || ""}-${searchParamsData?.page || ""}`;

    return (
        <div className="container flex flex-col gap-8 py-14">
            <div className="flex items-center gap-4 flex-col-reverse max-md:items-start md:flex-row">
                <PageSearch />
                <Link href="/ideas/add">
                    <Button className="w-max">+ {t("ideas.addIdea")}</Button>
                </Link>
            </div>

            <div className="flex items-start gap-8">
                <div className="flex-col gap-6 w-1/5 hidden xl:flex">
                    <SpecialitiesPageFilter filters={filters || []} />
                </div>

                <div className="flex flex-col gap-6 w-full">
                    <h2 className="font-semibold text-2xl">{t("common.recommended")}</h2>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Suspense fallback={<IdeasContentSkeleton />} key={contentKey}>
                            <IdeasContent searchParams={searchParamsData} />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
}

function IdeasContentSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 5 }).map((_, i) => (
                <IdeaCardSkeleton key={i} />
            ))}
        </div>
    );
}
