import ArticleCard from "@/components/cards/article-card";
import { getAllArticles, getArticle } from "@/features/articles/services";
import moment from "moment";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiCalendar, FiUser } from "react-icons/fi";

export default async function ArticlePage({
    params
}: {
    params: Promise<Record<string, string | undefined>>;
}) {
    const paramsData = await params;
    const t = await getTranslations();
    const locale = await getLocale();

    const { data: article } = await getArticle(paramsData.id as string);

    if (!article) {
        return notFound();
    }

    const { data: suggestedArticles } = await getAllArticles({
        params: {
            per_page: "6"
        }
    });

    return (
        <div className="container min-h-screen py-16 flex flex-col gap-20 items-center">
            <div className="flex flex-col gap-10 max-w-6xl">
                <div className="flex flex-col gap-6">
                    <h1 className="font-semibold text-2xl lg:text-4xl">{article.title}</h1>
                    <p className="text-dark-300">{article.sub_title}</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-primary-main">
                                <FiUser />
                            </span>
                            <p>{article.user}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-primary-main">
                                <FiCalendar />
                            </span>
                            <time>
                                {moment(article.created_at).locale(locale).format("YYYY/MM/DD")}
                            </time>
                        </div>
                    </div>
                </div>
                <div className="relative aspect-video w-full">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>
                <article
                    dangerouslySetInnerHTML={{
                        __html: article.content
                    }}
                />
                <div className="flex items-center gap-4">
                    <p className="font-semibold">{t("common.tags")}:</p>
                    <div className="flex items-center gap-2">
                        {article.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-dark-400 border border-light-400 rounded-lg p-2 text-sm"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10 w-full">
                <h2 className="text-3xl font-semibold">{t("articles.suggestedArticles")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suggestedArticles?.map((article, idx) => {
                        return <ArticleCard article={article} key={idx} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return [{ id: "1" }];
}
