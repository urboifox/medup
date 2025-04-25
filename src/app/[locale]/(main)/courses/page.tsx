import ErrorFallback from "@/components/layout/error-fallback";
import SpecialitiesPageFilter from "@/components/layout/specialities-page-filter";
import { getCollegesWithSpecialities } from "@/services/select-menu";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PageSearch from "@/components/layout/page-search";
import Button from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import MobileFilterButton from "@/components/layout/mobile-filter-button";
import CoursesContent from "@/features/courses/components/courses-content";
import CourseCardSkeleton from "@/features/courses/components/course-card-skeleton";
import DoubleCards from "@/components/cards/double-cards";

export default async function CoursesPage({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    const t = await getTranslations();
    const { data: filters } = await getCollegesWithSpecialities();
    const searchParamsData = await searchParams;
    const contentKey = `${searchParamsData?.specialities || ""}`;

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
                    <Link href="/courses/add">
                        <Button className="w-max">+ {t("courses.addCourse")}</Button>
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
                        <Suspense fallback={<CoursesContentSkeleton length={4} />} key={contentKey}>
                            <CoursesContent searchParams={searchParamsData} />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
}

function CoursesContentSkeleton({ length = 8 }: { length?: number }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8">
            {Array.from({ length }).map((_, i) => (
                <CourseCardSkeleton key={i} />
            ))}
        </div>
    );
}
