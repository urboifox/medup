import ArticlesContent from "@/features/articles/components/articles-content";
import ArticlesUploadSection from "@/features/articles/components/articles-upload-section";
import { getTranslations } from "next-intl/server";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function ArticlesPage({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    const t = await getTranslations();
    const searchParamsData = await searchParams;

    return (
        <div className="min-h-screen container py-16 flex flex-col gap-16">
            <ArticlesUploadSection />
            <main className="flex flex-col gap-6">
                <h2 className="text-3xl font-semibold">{t("articles.allArticles")}</h2>
                <ArticlesContent searchParams={searchParamsData} />
            </main>
        </div>
    );
}
