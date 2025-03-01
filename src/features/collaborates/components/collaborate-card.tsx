import Image from "next/image";
import { Collaborate } from "../types";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import { UserType } from "@/types/user";
import { FaUniversity } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { FaArrowRight } from "react-icons/fa6";
import Button from "@/components/ui/button";
import { HiExternalLink } from "react-icons/hi";

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
        <article className="w-full flex flex-col gap-6 p-4 border border-light-300 rounded-xl">
            <div className="flex flex-col gap-4">
                <Link
                    href={`/collaborates/${collaborate.id}`}
                    className="flex flex-col gap-2 group"
                >
                    <h2
                        className="font-semibold text-2xl line-clamp-2 group-hover:underline"
                        title={collaborate.title}
                    >
                        {collaborate.title}
                    </h2>
                    <p className="line-clamp-3 text-dark-300">{collaborate.description}</p>
                </Link>
                <div className="flex items-center gap-2 text-sm text-dark-300">
                    <FaUniversity />
                    {collaborate.speciality?.college?.name}, {collaborate.speciality?.name}
                </div>
                {collaborate.orcid_number && (
                    <a
                        href={collaborate.orcid_number as string}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-main flex items-center gap-2 hover:underline text-sm"
                    >
                        <HiExternalLink />
                        {t("labels.orcidNumber")}
                    </a>
                )}
                <div className="flex items-center gap-2">
                    <p className="font-medium text-dark-300">{t("common.paidVolunteer")}:</p>
                    <span className="font-medium text-primary-main">
                        {(collaborate?.price || 0) > 0
                            ? `$${collaborate.price} `
                            : t("common.free")}
                    </span>
                </div>
                <Link
                    className="group flex items-center gap-4"
                    href={`/collaborates/${collaborate.expert.id}`}
                >
                    <Image
                        src={collaborate.expert.user.avatar}
                        alt={collaborate.expert.user.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover aspect-square w-12"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold group-hover:underline">
                            {collaborate.expert.user.name}
                        </h3>
                        <p className="text-sm text-dark-300">
                            {t(userTypesTranslationKey[collaborate.expert.user.type])}
                        </p>
                    </div>
                </Link>
            </div>
            <div className="flex items-end gap-2 justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                    {t("experts.chatNow")} <FaArrowRight className="rtl:rotate-180" />
                </Button>
                <span className="text-xs font-medium">
                    {moment(collaborate.created_at).locale(locale).format("LL")}
                </span>
            </div>
        </article>
    );
}
