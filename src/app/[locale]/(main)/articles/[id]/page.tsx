import ArticleCard from "@/components/cards/article-card";
import images from "@/lib/images";
import moment from "moment";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { FiCalendar, FiUser } from "react-icons/fi";

export default async function ArticlePage() {
    const t = await getTranslations();
    const locale = await getLocale();

    const tags = [t("temp.articleTag"), t("temp.articleTag")];
    const articles = Array(6).fill(null);

    return (
        <div className="container min-h-screen py-16 flex flex-col gap-20 items-center">
            <div className="flex flex-col gap-10 max-w-6xl">
                <div className="flex flex-col gap-6">
                    <h1 className="font-semibold text-2xl lg:text-4xl">{t("temp.articleTitle")}</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-primary-main">
                                <FiUser />
                            </span>
                            <p>{t("temp.articleAuthor")}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-primary-main">
                                <FiCalendar />
                            </span>
                            <time>{moment().locale(locale).format("YYYY/MM/DD")}</time>
                        </div>
                    </div>
                </div>
                <div className="relative aspect-video w-full">
                    <Image src={images.hero} alt="Doctor" fill />
                </div>
                <article
                    dangerouslySetInnerHTML={{
                        __html: t("temp.articleDescription")
                    }}
                />
                <div className="flex items-center gap-4">
                    <p className="font-semibold">{t("common.tags")}:</p>
                    <div className="flex items-center gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-dark-400 border border-light-400 rounded-lg p-2 text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <h2 className="text-3xl font-semibold">{t("articles.suggestedArticles")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((_, idx) => {
                        return <ArticleCard key={idx} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return [{ id: "1" }];
}
