import Pagination from "@/components/ui/pagination";
import { getAllArticles } from "../services";
import ArticleCard from "@/components/cards/article-card";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function ArticlesContent({ searchParams }: { searchParams: SearchParams }) {
    const { data: articles, meta } = await getAllArticles({
        params: {
            page: (searchParams?.page as string) || "1",
            per_page: "9"
        }
    });

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles?.map((article, idx) => {
                    return <ArticleCard article={article} key={idx} />;
                })}
            </div>
            <Pagination
                currentPage={parseInt(searchParams?.page as string) || 1}
                lastPage={(meta?.last_page as number) || 1}
            />
        </>
    );
}
