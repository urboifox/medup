import ArticleCard from "@/components/cards/article-card";

export default function ArticlesPage() {
    const articles = Array(6).fill(null);

    return (
        <div className="min-h-screen container py-16 flex flex-col gap-16">
            <div className="flex flex-col gap-8">
                <h2 className="text-3xl font-semibold">المقالات المنشورة حديثًا</h2>
                <div className="flex flex-col xl:flex-row gap-8">
                    <ArticleCard imageContainerClassName="xl:aspect-[2.4]" />
                    <div className="flex flex-col sm:flex-row xl:flex-col gap-8 flex-1">
                        <ArticleCard
                            className="xl:flex-row xl:[&_p]:line-clamp-2"
                            imageContainerClassName="xl:aspect-[1.6]"
                        />
                        <ArticleCard
                            className="xl:flex-row xl:[&_p]:line-clamp-2"
                            imageContainerClassName="xl:aspect-[1.6]"
                        />
                    </div>
                </div>
                <ArticleCard className="xl:flex-row" imageContainerClassName="xl:aspect-[2.4]" />
            </div>
            <main className="flex flex-col gap-6">
                <h2 className="text-3xl font-semibold">جميع المقالات</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((_, idx) => {
                        return <ArticleCard key={idx} />;
                    })}
                </div>
            </main>
        </div>
    );
}
