import ExpertCard from "@/components/cards/expert-card";
import NoResults from "@/components/ui/no-results";
import Pagination from "@/components/ui/pagination";
import ExpertsSearchHeader from "@/features/experts/components/experts-search-header";
import { getAllExperts } from "@/features/experts/services";

export default async function ExpertsPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { handle, page, only_premium, city, skills, colleges, specialities } = await searchParams;

    const params: Record<string, string> = {};

    if (handle) params.handle = handle;
    if (page) params.page = page;
    if (only_premium !== "0") params.only_premium = "1";
    if (city) params.city = city;
    if (skills) params.skills = skills;
    if (colleges) params.colleges = colleges;
    if (specialities && specialities !== "[]") params.specialities = specialities;

    const { data: experts, meta } = await getAllExperts({ params });

    return (
        <div className="min-h-screen container py-10 flex flex-col gap-10">
            <ExpertsSearchHeader />
            {experts?.length === 0 ? (
                <NoResults />
            ) : (
                <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
                    {experts?.map((expert) => {
                        return <ExpertCard key={expert.id} expert={expert} />;
                    })}
                </main>
            )}

            <Pagination
                currentPage={parseInt((page as string) || "1")}
                lastPage={(meta?.last_page as number) || 1}
            />
        </div>
    );
}
