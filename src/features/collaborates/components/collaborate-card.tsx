import Image from "next/image";
import { Collaborate } from "../types";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import { UserType } from "@/types/user";
import { FaUniversity } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { FaDollarSign } from "react-icons/fa6";

const userTypesTranslationKey = {
    [UserType.Expert]: "common.expert",
    [UserType.Trainee]: "common.trainee",
    [UserType.Student]: "common.student",
    [UserType.Researcher]: "common.researcher"
} as const;

export default function CollaborateCard({ collaborate }: { collaborate: Collaborate }) {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <article className="py-3 px-6 rounded-2xl border border-light-400 w-full flex flex-col gap-6 transition-colors duration-200 hover:border-primary-main">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Image
                        src={collaborate.expert.user.avatar}
                        alt={collaborate.expert.user.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover aspect-square w-12"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{collaborate.expert.user.name}</h3>
                        <p className="text-sm text-dark-300">
                            {t(userTypesTranslationKey[collaborate.expert.user.type])}
                            <span className="text-dark-300"> • </span>
                            {moment(collaborate.created_at).locale(locale).fromNow()}
                        </p>
                    </div>
                </div>
                <Link href={`/collaborate/${collaborate.id}`} className="flex flex-col gap-2">
                    <h2 className="font-semibold text-2xl line-clamp-2" title={collaborate.title}>
                        {collaborate.title}
                    </h2>
                    <p className="line-clamp-3 text-dark-300">{collaborate.description}</p>
                </Link>
                <div className="flex items-center gap-2 text-sm text-dark-300">
                    <FaUniversity />
                    {collaborate.speciality?.college?.name}, {collaborate.speciality?.name}
                </div>
                <div className="text-dark-400">
                    {t("labels.orcidNumber")}:{" "}
                    <span className="text-dark-300">
                        {"orcid_number" in collaborate
                            ? (collaborate.orcid_number as string)
                            : t("common.noResults")}
                    </span>
                </div>
                <div className="flex items-center text-primary-main font-bold">
                    <FaDollarSign />
                    {collaborate.price || 0}
                </div>
            </div>
        </article>
    );
}
