import ErrorFallback from "@/components/layout/error-fallback";
import SidebarPriceFilter from "@/components/layout/sidebar-price-filter";
import SpecialitiesPageFilter from "@/components/layout/specialities-page-filter";
import CollaborateCardSkeleton from "@/features/collaborate/components/collaborate-card-skeleton";
import CollaborateContent from "@/features/collaborate/components/collaborate-content";
import { getCollegesWithSpecialities } from "@/services/select-menu";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function CollaboratePage({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { data: filters } = await getCollegesWithSpecialities();
    const searchParamsData = await searchParams;

    return (
        <div className="flex items-start gap-8">
            <div className="flex-col gap-6 w-1/5 hidden xl:flex">
                <SpecialitiesPageFilter filters={filters || []} />
                <div className="h-px w-full bg-light-300" />
                <SidebarPriceFilter />
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
                        <CollaborateContent searchParams={searchParamsData} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    );
}
