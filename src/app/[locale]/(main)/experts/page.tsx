import ExpertCard from "@/components/cards/expert-card";
import Pagination from "@/components/ui/pagination";
import ExpertsSearchHeader from "@/features/experts/components/experts-search-header";
import { getAllExperts } from "@/features/experts/services";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function ExpertsPage({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { handle, page } = await searchParams;

    const { data: experts, meta } = await getAllExperts({
        params: { only_top: "0", handle: (handle as string) || "", page: (page as string) || "" }
    });

    return (
        <div className="min-h-screen container py-10 flex flex-col gap-20">
            <ExpertsSearchHeader />
            <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
                {experts?.map((expert) => {
                    return <ExpertCard key={expert.id} expert={expert} />;
                })}
            </main>

            <Pagination
                currentPage={parseInt((page as string) || "1")}
                lastPage={(meta?.last_page as number) || 1}
            />
        </div>
    );
}
