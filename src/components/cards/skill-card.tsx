import icons from "@/lib/icons";
import images from "@/lib/images";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Skill } from "@/features/select-menu/types";
import { useTranslations } from "next-intl";

export default function SkillCard({ skill }: { skill: Skill }) {
    const t = useTranslations();

    return (
        <article className="bg-white shadow-lg shadow-gray-200 rounded-lg p-10 flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Image
                    src={images.skill}
                    alt="Skill"
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] aspect-square"
                />
                <h3 className="text-2xl">{skill.name}</h3>
            </div>

            <div className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src={icons.star}
                        alt="Star"
                        width={20}
                        height={20}
                        className="-translate-y-1"
                    />
                    <Link
                        href="/"
                        className="text-lg transition-colors duration-200 hover:text-primary-main text-dark-300 hover:underline"
                    >
                        {skill.experts_count} {t("common.experts")}
                    </Link>
                </div>

                <Link
                    href="/"
                    className="text-lg transition-colors duration-200 hover:text-primary-main text-dark-300 hover:underline"
                >
                    {skill.posts_count} {t("common.posts")}
                </Link>
            </div>
        </article>
    );
}
