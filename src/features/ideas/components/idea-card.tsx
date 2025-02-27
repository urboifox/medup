import Image from "next/image";
import { Idea } from "../types";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import { UserType } from "@/types/user";
import { FaUniversity } from "react-icons/fa";
import { Link } from "@/i18n/routing";

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
        <article className="py-3 px-6 rounded-2xl border border-light-400 w-full flex flex-col gap-6 transition-colors duration-200 hover:border-primary-main">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Image
                        src={idea.expert.user.avatar}
                        alt={idea.expert.user.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover aspect-square w-12"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{idea.expert.user.name}</h3>
                        <p className="text-sm text-dark-300">
                            {t(userTypesTranslationKey[idea.expert.user.type])}
                            <span className="text-dark-300"> • </span>
                            {moment(idea.created_at).locale(locale).fromNow()}
                        </p>
                    </div>
                </div>
                <Link href={`/ideas/${idea.id}`} className="flex flex-col gap-2">
                    <h2 className="font-semibold text-2xl line-clamp-2" title={idea.title}>
                        {idea.title}
                    </h2>
                    <p className="line-clamp-3 text-dark-300">{idea.description}</p>
                </Link>
                <div className="flex items-center gap-2 text-sm text-dark-300">
                    <FaUniversity />
                    {idea.speciality?.college?.name}, {idea.speciality?.name}
                </div>
                <div className="text-dark-400">
                    {t("labels.orcidNumber")}:{" "}
                    <span className="text-dark-300">
                        {"orcid_number" in idea
                            ? (idea.orcid_number as string)
                            : t("common.noResults")}
                    </span>
                </div>
            </div>
        </article>
    );
}
