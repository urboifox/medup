import ErrorFallback from "@/components/layout/error-fallback";
import SpecialitiesPageFilter from "@/components/layout/specialities-page-filter";
import BookCardSkeleton from "@/features/library/components/book-card-skeleton";
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
import MobileFilterButton from "@/components/layout/mobile-filter-button";
import DoubleCards from "@/components/cards/double-cards";

export default async function LibraryPage({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    const t = await getTranslations();
    const { data: filters } = await getCollegesWithSpecialities();
    const searchParamsData = await searchParams;
    const newContentKey = `${searchParamsData?.specialities || ""}-${searchParamsData?.handle || ""}-${searchParamsData?.page || ""}`;
    const recommendedContentKey = `${searchParamsData?.specialities || ""}`;

    return (
        <div className="container flex flex-col gap-8 py-14">
            <div className="flex items-center gap-4 flex-col-reverse max-md:items-start md:flex-row">
                <PageSearch />
                <div className="flex items-center gap-2">
                    <MobileFilterButton>
                        <div className="flex-col gap-6 flex">
                            <SpecialitiesPageFilter filters={filters || []} />
                        </div>
                    </MobileFilterButton>
                    <Link href="/library/add">
                        <Button className="w-max">+ {t("library.addBook")}</Button>
                    </Link>
                </div>
            </div>

            <div className="flex items-start gap-8">
                <div className="flex-col gap-6 w-1/5 hidden xl:flex">
                    <SpecialitiesPageFilter filters={filters || []} />
                </div>

                <div className="flex flex-col gap-6 w-full">
                    <DoubleCards />
                    <h2 className="font-semibold text-2xl">{t("common.recommended")}</h2>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Suspense
                            fallback={<LibraryContentSkeleton length={4} />}
                            key={recommendedContentKey}
                        >
                            <LibrarySuggestedContent searchParams={searchParamsData} />
                        </Suspense>
                    </ErrorBoundary>

                    <h2 className="font-semibold text-2xl">{t("common.new")}</h2>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Suspense fallback={<LibraryContentSkeleton />} key={newContentKey}>
                            <LibraryLatestContent searchParams={searchParamsData} />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
}

function LibraryContentSkeleton({ length = 8 }: { length?: number }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8">
            {Array.from({ length }).map((_, i) => (
                <BookCardSkeleton key={i} />
            ))}
        </div>
    );
}
