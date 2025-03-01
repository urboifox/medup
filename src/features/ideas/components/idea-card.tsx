import Image from "next/image";
import { Idea } from "../types";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import { UserType } from "@/types/user";
import { FaUniversity } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { HiExternalLink } from "react-icons/hi";
import Button from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";

const userTypesTranslationKey = {
    [UserType.Expert]: "common.expert",
    [UserType.Trainee]: "common.trainee",
    [UserType.Student]: "common.student",
    [UserType.Researcher]: "common.researcher"
} as const;

export default function IdeaCard({ idea }: { idea: Idea }) {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <article className="w-full flex flex-col gap-6 p-4 border border-light-300 rounded-xl">
            <div className="flex flex-col gap-4">
                <Link href={`/ideas/${idea.id}`} className="flex flex-col gap-2 group">
                    <h2
                        className="font-semibold text-2xl line-clamp-2 group-hover:underline"
                        title={idea.title}
                    >
                        {idea.title}
                    </h2>
                    <p className="line-clamp-3 text-dark-300">{idea.description}</p>
                </Link>
                <div className="flex items-center gap-2 text-sm text-dark-300">
                    <FaUniversity />
                    {idea.speciality?.college?.name}, {idea.speciality?.name}
                </div>
                {idea.orcid_number && (
                    <a
                        href={idea.orcid_number as string}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-main flex items-center gap-2 hover:underline text-sm"
                    >
                        <HiExternalLink />
                        {t("labels.orcidNumber")}
                    </a>
                )}
                <Link className="group flex items-center gap-4" href={`/ideas/${idea.expert.id}`}>
                    <Image
                        src={idea.expert.user.avatar}
                        alt={idea.expert.user.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover aspect-square w-12"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold group-hover:underline">
                            {idea.expert.user.name}
                        </h3>
                        <p className="text-sm text-dark-300">
                            {t(userTypesTranslationKey[idea.expert.user.type])}
                        </p>
                    </div>
                </Link>
            </div>
            <div className="flex items-end gap-2 justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                    {t("experts.chatNow")} <FaArrowRight className="rtl:rotate-180" />
                </Button>
                <span className="text-xs font-medium">
                    {moment(idea.created_at).locale(locale).format("LL")}
                </span>
            </div>
        </article>
    );
}
