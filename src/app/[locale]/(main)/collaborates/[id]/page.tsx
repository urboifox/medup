import Button from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { userTypesTranslationKey } from "@/constants";
import { getCollaborateItem } from "@/features/collaborates/services";
import CommentsSection from "@/features/comments/components/comments-section";
import { getComments } from "@/features/comments/services";
import ExpertProfileActionButton from "@/features/experts/components/expert-profile-action-button";
import { Link } from "@/i18n/routing";
import moment from "moment";
import { getLocale, getTranslations } from "next-intl/server";
import { SearchParams } from "next/dist/server/request/search-params";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { FaUniversity } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { HiExternalLink } from "react-icons/hi";

export default async function CollaboratePage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<SearchParams>;
}) {
    const searchParamsData = await searchParams;
    const { id } = await params;
    const res = await getCollaborateItem(id).catch(() => null);
    if (!res || !res.data) return notFound();
    const { data: collaborate } = res;

    const { data: comments, meta } = await getComments({
        params: {
            commentable_id: id,
            type: "collaborate",
            page: (searchParamsData?.page as string) || "1",
            with_favorites: "yes"
        }
    });

    const t = await getTranslations();
    const locale = await getLocale();

    return (
        <div className="container flex flex-col gap-8 py-14">
            <Link href="/collaborates">
                <button className="flex items-center gap-2 hover:underline">
                    <BsArrowLeft />
                    {t("common.backTo")} {t("nav.collaborate")}
                </button>
            </Link>
            <div className="flex items-center gap-2 justify-between">
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
                <ExpertProfileActionButton expert={collaborate.expert} />
            </div>
            <span className="text-xs font-medium">
                {moment(collaborate.created_at).locale(locale).format("LL")}
            </span>
            <div className="flex flex-col gap-4">
                <h2
                    className="font-semibold text-2xl line-clamp-2 group-hover:underline"
                    title={collaborate.title}
                >
                    {collaborate.title}
                </h2>
                <p className="text-dark-300">{collaborate.description}</p>
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
            </div>

            <CommentsSection comments={comments || []} commentableId={id} type="collaborate" />

            <Pagination
                currentPage={parseInt((searchParamsData?.page as string) || "1")}
                lastPage={(meta?.last_page as number) || 1}
            />
        </div>
    );
}
