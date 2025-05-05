import Button from "../ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import ExpertsContentMap from "@/features/experts/components/experts-content-map";
import { Suspense } from "react";
import ExpertsContentSkeleton from "@/features/experts/components/experts-content-skeleton";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../layout/error-fallback";
import ExpertsSearchFilters from "@/features/experts/components/experts-search-filters";

export default async function ExpertsSection({
    searchParams
}: {
    searchParams: Record<string, string | undefined>;
}) {
    const t = await getTranslations();

    return (
        <section className="container py-10 flex flex-col gap-20">
            <div className="flex flex-col gap-10 text-center items-center mx-auto">
                <h2 className="capitalize text-3xl lg:text-5xl font-semibold">{t("home.experts.title")}</h2>
                <ExpertsSearchFilters showCountries />
                {/* <p className="max-w-4xl text-dark-300 text-lg lg:text-xl"> */}
                {/*     {t("home.experts.description")} */}
                {/* </p> */}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Suspense fallback={<ExpertsContentSkeleton />}>
                        <ExpertsContentMap searchParams={searchParams} />
                    </Suspense>
                </ErrorBoundary>
            </div>
            <Link href="/experts" className="w-max mx-auto">
                <Button>{t("common.discoverMore")}</Button>
            </Link>
        </section>
    );
}
