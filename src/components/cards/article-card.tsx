import moment from "moment";
import Tag from "../ui/tag";
import icons from "@/lib/icons";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import images from "@/lib/images";
import { cn } from "@/utils/cn";
import { useLocale, useTranslations } from "next-intl";

export default function ArticleCard({
    className,
    imageContainerClassName
}: {
    className?: string;
    imageContainerClassName?: string;
}) {
    const t = useTranslations();
    const locale = useLocale();

    const tags = [t("temp.articleTag")];

    return (
        <article className={cn("flex-1 flex flex-col gap-6", className)}>
            <div className={cn("relative flex-1 w-full aspect-[1.6]", imageContainerClassName)}>
                <Image src={images.hero} alt="Doctor" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-6 flex-1 justify-center">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1 text-primary-main font-semibold text-sm">
                        <p>{t("temp.articleAuthor")}</p> •{" "}
                        <time>{moment().locale(locale).format("YYYY/MM/DD")}</time>
                    </div>
                    <Link href="/articles/1" className="hover:underline">
                        <h3 className="font-semibold text-lg lg:text-2xl text-dark-400 flex items-start gap-1 w-full justify-between line-clamp-2">
                            {t("temp.articleTitle")}
                            <Image
                                className="rtl:scale-x-[-1] mt-1"
                                src={icons.goto}
                                alt="Go to"
                                width={24}
                                height={24}
                            />
                        </h3>
                    </Link>
                    <p className="text-dark-300 line-clamp-3">{t("temp.articleDescription")}</p>
                </div>
                <div className="flex items-center gap-2">
                    {tags.map((tag, index) => (
                        <Tag key={index} name={tag} />
                    ))}
                </div>
            </div>
        </article>
    );
}
