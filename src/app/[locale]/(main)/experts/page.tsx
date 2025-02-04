import ExpertCard from "@/components/cards/expert-card";
import Pagination from "@/components/ui/pagination";
import ExpertsSearchHeader from "@/features/experts/components/experts-search-header";
import { getAllExperts } from "@/features/experts/services";

export default async function ExpertsPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { handle, page, only_premium, city, skills, colleges, specialities } = await searchParams;

    const { data: experts, meta } = await getAllExperts({
        params: {
            handle: handle ?? "",
            page: page ?? "",
            only_premium: only_premium === "0" ? "" : "1",
            city: city ?? "",
            skills: skills ?? "",
            colleges: colleges ?? "",
            specialities: specialities ?? "",

        }
    });

    return (
        <div className="min-h-screen container py-10 flex flex-col gap-10">
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
