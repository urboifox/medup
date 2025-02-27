import { SearchParams } from "next/dist/server/request/search-params";
import { sanitizeObject } from "@/utils/sanitize-object";
import Pagination from "@/components/ui/pagination";
import NoResults from "@/components/ui/no-results";
import { getLibrary } from "../services";
import LibraryCard from "./book-card";

export default async function LibraryLatestContent({
    searchParams
}: {
    searchParams: SearchParams;
}) {
    const { data: library, meta } = await getLibrary({
        params: sanitizeObject({
            ...(searchParams as Record<string, string | string>),
            per_page: "8"
        })
    });

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8">
                {library?.length === 0 && <NoResults />}
                {library?.map((libraryItem) => {
                    return <LibraryCard key={libraryItem.id} libraryItem={libraryItem} />;
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
