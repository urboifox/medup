import Pagination from "@/components/ui/pagination";
import { getAllExperts } from "../services";
import { sanitizeObject } from "@/utils/sanitize-object";
import ExpertCard from "@/components/cards/expert-card";
import NoResults from "@/components/ui/no-results";

export default async function ExpertsPageContent({
    searchParams
}: {
    searchParams: Record<string, string | undefined>;
}) {
    const { handle, page, only_premium, city, skills, colleges, specialities } = searchParams;

    const { data: experts, meta } = await getAllExperts({
        params: sanitizeObject({
            handle,
            page,
            only_premium: only_premium === "1" ? "1" : "",
            city,
            skills,
            colleges,
            specialities
        })
    });

    return (
        <>
            {experts?.length === 0 && <NoResults />}
            <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
                {experts?.map((expert) => {
                    return <ExpertCard key={expert.id} expert={expert} />;
                })}
            </main>
            <Pagination
                currentPage={parseInt((page as string) || "1")}
                lastPage={(meta?.last_page as number) || 1}
            />
        </>
    );
}
