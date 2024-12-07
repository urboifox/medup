import ExpertCard from "@/components/cards/expert-card";
import ExpertsSearchHeader from "@/components/experts/experts-search-header";
import Pagination from "@/components/ui/pagination";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function ExpertsPage({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    // NOTE: q => query
    const { q, page } = await searchParams;

    const experts = Array(12).fill({ q, page });

    return (
        <div className="min-h-screen container py-10 flex flex-col gap-20">
            <ExpertsSearchHeader />

            <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
                {experts.map((_, idx) => {
                    return <ExpertCard key={idx} />;
                })}
            </main>

            <Pagination currentPage={parseInt((page as string) || "1")} lastPage={10} />
        </div>
    );
}
