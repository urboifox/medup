import moment from "moment";
import Tag from "../ui/tag";
import icons from "@/lib/icons";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { useLocale } from "next-intl";
import { Article } from "@/features/articles/types";

export default function ArticleCard({
    className,
    imageContainerClassName,
    article
}: {
    className?: string;
    imageContainerClassName?: string;
    article: Article;
}) {
    const locale = useLocale();

    return (
        <article className={cn("flex-1 flex flex-col gap-6", className)}>
            <div className={cn("relative flex-1 w-full aspect-[1.6]", imageContainerClassName)}>
                <Image src={article?.image} alt="Doctor" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-6 flex-1 justify-center">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1 text-primary-main font-semibold text-sm">
                        <p>{article.user}</p> •{" "}
                        <time>
                            {moment(article.created_at).locale(locale).format("YYYY/MM/DD")}
                        </time>
                    </div>
                    <Link href="/articles/1" className="hover:underline">
                        <h3 className="font-semibold text-lg lg:text-2xl text-dark-400 flex items-start gap-1 w-full justify-between line-clamp-2">
                            {article.title}
                            <Image
                                className="rtl:scale-x-[-1] mt-1"
                                src={icons.goto}
                                alt="Go to"
                                width={24}
                                height={24}
                            />
                        </h3>
                    </Link>
                    <p className="text-dark-300 line-clamp-3">{article.sub_title}</p>
                </div>
                <div className="flex items-center gap-2">
                    {article?.tags?.map((tag, index) => <Tag key={index} name={tag.name} />)}
                </div>
            </div>
        </article>
    );
}
