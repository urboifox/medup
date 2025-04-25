import Pagination from "@/components/ui/pagination";
import { userTypesTranslationKey } from "@/constants";
import CommentsSection from "@/features/comments/components/comments-section";
import { getComments } from "@/features/comments/services";
import ExpertProfileActionButton from "@/features/experts/components/expert-profile-action-button";
import { getIdea } from "@/features/ideas/services";
import { Link } from "@/i18n/routing";
import moment from "moment";
import { getLocale, getTranslations } from "next-intl/server";
import { SearchParams } from "next/dist/server/request/search-params";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { FaUniversity } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";

export default async function IdeaPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<SearchParams>;
}) {
    const searchParamsData = await searchParams;
    const { id } = await params;
    const res = await getIdea(id).catch(() => null);
    if (!res || !res.data) return notFound();
    const { data: idea } = res;

    const { data: comments, meta } = await getComments({
        params: {
            commentable_id: id,
            type: "idea",
            page: (searchParamsData?.page as string) || "1",
            with_favorites: "yes"
        }
    });

    const t = await getTranslations();
    const locale = await getLocale();

    return (
        <div className="container flex flex-col gap-8 py-14">
            <Link href="/ideas">
                <button className="flex items-center gap-2 hover:underline">
                    <BsArrowLeft />
                    {t("common.backTo")} {t("nav.ideas")}
                </button>
            </Link>
            <div className="flex items-center gap-2 justify-between">
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
                <ExpertProfileActionButton expert={idea.expert} />
            </div>
            <span className="text-xs font-medium">
                {moment(idea.created_at).locale(locale).format("LL")}
            </span>
            <div className="flex flex-col gap-4">
                <h2
                    className="font-semibold text-2xl line-clamp-2 group-hover:underline"
                    title={idea.title}
                >
                    {idea.title}
                </h2>
                <p className="text-dark-300">{idea.description}</p>
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
            </div>

            <CommentsSection comments={comments || []} commentableId={id} type="idea" />

            <Pagination
                currentPage={parseInt((searchParamsData?.page as string) || "1")}
                lastPage={(meta?.last_page as number) || 1}
            />
        </div>
    );
}
