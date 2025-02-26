import ErrorFallback from "@/components/layout/error-fallback";
import PageSearch from "@/components/layout/page-search";
import SpecialitiesPageFilter from "@/components/layout/specialities-page-filter";
import Button from "@/components/ui/button";
import CollaborateCardSkeleton from "@/features/collaborate/components/collaborate-card-skeleton";
import IdeasContent from "@/features/ideas/components/ideas-content";
import { Link } from "@/i18n/routing";
import { getCollegesWithSpecialities } from "@/services/select-menu";
import { getTranslations } from "next-intl/server";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function IdeasPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const t = await getTranslations();
    const { data: filters } = await getCollegesWithSpecialities();
    const searchParamsData = await searchParams;

    return (
        <div className="container flex flex-col gap-8 py-14">
            <div className="flex items-center gap-4 flex-col-reverse max-md:items-start md:flex-row">
                <PageSearch />
                <Link href="/collaborate/add">
                    <Button className="w-max">+ {t("collaborate.addProject")}</Button>
                </Link>
            </div>

            <div className="flex items-start gap-8">
                <div className="flex-col gap-6 w-1/5 hidden xl:flex">
                    <SpecialitiesPageFilter filters={filters || []} />
                </div>

                <div className="flex flex-col gap-6 w-full">
                    <h2 className="font-semibold text-2xl">{"New"}</h2>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Suspense
                            fallback={Array.from({ length: 5 }).map((_, i) => (
                                <CollaborateCardSkeleton key={i} />
                            ))}
                            key={(searchParamsData?.specialities as string) || ""}
                        >
                            <IdeasContent searchParams={searchParamsData} />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
}
