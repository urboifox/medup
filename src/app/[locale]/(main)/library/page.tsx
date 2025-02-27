import ErrorFallback from "@/components/layout/error-fallback";
import SpecialitiesPageFilter from "@/components/layout/specialities-page-filter";
import CollaborateCardSkeleton from "@/features/collaborates/components/collaborate-card-skeleton";
import { getCollegesWithSpecialities } from "@/services/select-menu";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PageSearch from "@/components/layout/page-search";
import Button from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import LibrarySuggestedContent from "@/features/library/components/library-suggested-content";
import LibraryLatestContent from "@/features/library/components/library-latest-content";

export default async function LibraryPage({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    const t = await getTranslations();
    const { data: filters } = await getCollegesWithSpecialities();
    const searchParamsData = await searchParams;
    const contentKey = `${searchParamsData?.specialities || ""}-${searchParamsData?.handle || ""}-${searchParamsData?.page || ""}`;

    return (
        <div className="container flex flex-col gap-8 py-14">
            <div className="flex items-center gap-4 flex-col-reverse max-md:items-start md:flex-row">
                <PageSearch />
                <Link href="/library/add">
                    <Button className="w-max">+ {t("library.addBook")}</Button>
                </Link>
            </div>

            <div className="flex items-start gap-8">
                <div className="flex-col gap-6 w-1/5 hidden xl:flex">
                    <SpecialitiesPageFilter filters={filters || []} />
                </div>

                <div className="flex flex-col gap-6 w-full">
                    <h2 className="font-semibold text-2xl">{t("common.recommended")}</h2>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Suspense
                            fallback={Array.from({ length: 5 }).map((_, i) => (
                                <CollaborateCardSkeleton key={i} />
                            ))}
                            // key={contentKey}
                        >
                            <LibrarySuggestedContent searchParams={searchParamsData} />
                        </Suspense>
                    </ErrorBoundary>

                    <h2 className="font-semibold text-2xl">{t("common.new")}</h2>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Suspense
                            fallback={Array.from({ length: 5 }).map((_, i) => (
                                <CollaborateCardSkeleton key={i} />
                            ))}
                            key={contentKey}
                        >
                            <LibraryLatestContent searchParams={searchParamsData} />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
}
