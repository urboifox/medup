import { SearchParams } from "next/dist/server/request/search-params";
import { getIdeas } from "../services";
import { sanitizeObject } from "@/utils/sanitize-object";
import Pagination from "@/components/ui/pagination";
import NoResults from "@/components/ui/no-results";
import IdeaCard from "./idea-card";

export default async function IdeasContent({ searchParams }: { searchParams: SearchParams }) {
    const { data: ideas, meta } = await getIdeas({
        params: sanitizeObject({
            ...(searchParams as Record<string, string | string>),
            per_page: "5"
        })
    });

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 w-full">
                {ideas?.length === 0 && <NoResults />}
                {ideas?.map((idea) => {
                    return <IdeaCard key={idea.id} idea={idea} />;
                })}
            </div>

            <Pagination
                scroll
                currentPage={parseInt((searchParams?.page as string) || "1")}
                lastPage={(meta?.last_page as number) || 1}
            />
        </div>
    );
}
