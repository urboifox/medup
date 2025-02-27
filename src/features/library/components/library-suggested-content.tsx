import { SearchParams } from "next/dist/server/request/search-params";
import { sanitizeObject } from "@/utils/sanitize-object";
import NoResults from "@/components/ui/no-results";
import { getLibrary } from "../services";
import LibraryCard from "./book-card";

export default async function LibrarySuggestedContent({
    searchParams
}: {
    searchParams: SearchParams;
}) {
    const { data: library } = await getLibrary({
        params: sanitizeObject({
            specialities: searchParams?.specialities ? (searchParams?.specialities as string) : "",
            per_page: "5"
        }),
        next: {
            revalidate: 60
        }
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8">
            {library?.length === 0 && <NoResults />}
            {library?.slice(0, 4)?.map((libraryItem) => {
                return <LibraryCard key={libraryItem.id} libraryItem={libraryItem} />;
            })}
        </div>
    );
}
