import { SearchParams } from "next/dist/server/request/search-params";
import { getCollaborateContent } from "../services";
import { sanitizeObject } from "@/utils/sanitize-object";
import CollaborateCard from "./collaborate-card";
import Pagination from "@/components/ui/pagination";

export default async function CollaborateContent({ searchParams }: { searchParams: SearchParams }) {
    const { data: collaborates, meta } = await getCollaborateContent({
        params: sanitizeObject({
            ...(searchParams as Record<string, string | string>),
            per_page: "5"
        })
    });

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 w-full">
                {collaborates?.map((collaborate) => {
                    return <CollaborateCard key={collaborate.id} collaborate={collaborate} />;
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
