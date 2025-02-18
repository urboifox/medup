import ArticleCard from "@/components/cards/article-card";
import Pagination from "@/components/ui/pagination";
import { getAllArticles } from "@/features/articles/services";
import { getTranslations } from "next-intl/server";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function ArticlesPage({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    const t = await getTranslations();
    const { page } = await searchParams;
    const { data: articles } = await getAllArticles();

    return (
        <div className="min-h-screen container py-16 flex flex-col gap-16">
            <main className="flex flex-col gap-6">
                <h2 className="text-3xl font-semibold">{t("articles.allArticles")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles?.map((article, idx) => {
                        return <ArticleCard article={article} key={idx} />;
                    })}
                </div>
                <Pagination currentPage={parseInt((page as string) || "1")} lastPage={10} />
            </main>
        </div>
    );
}
