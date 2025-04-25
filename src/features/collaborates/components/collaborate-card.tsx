"use client";
import Image from "next/image";
import { Collaborate } from "../types";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import { FaUniversity } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { HiExternalLink } from "react-icons/hi";
import { userTypesTranslationKey } from "@/constants";
import ExpertProfileActionButton from "@/features/experts/components/expert-profile-action-button";
import Modal from "@/components/ui/modal";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import CommentsSection from "@/features/comments/components/comments-section";
import { BiComment } from "react-icons/bi";

export default function CollaborateCard({ collaborate }: { collaborate: Collaborate }) {
    const t = useTranslations();
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <article className="w-full flex flex-col gap-6 p-4 border border-light-300 rounded-xl">
            <Modal visible={isOpen} onClose={() => setIsOpen(false)}>
                <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-4 py-10 lg:p-6 flex flex-col items-end">
                    <button onClick={() => setIsOpen(false)}>
                        <FaX />
                    </button>
                    <div className="w-full">
                        <CommentsSection
                            comments={collaborate.comments}
                            commentableId={collaborate.id.toString()}
                            type="collaborate"
                        />
                    </div>
                </div>
            </Modal>
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
                <ExpertProfileActionButton expert={collaborate.expert} />
                <div className="flex items-center gap-4">
                    <span className="text-xs font-medium">
                        {moment(collaborate.created_at).locale(locale).format("LL")}
                    </span>
                    <button
                        className="flex items-center gap-1 hover:text-primary-main"
                        onClick={() => setIsOpen(true)}
                    >
                        {collaborate.comments_count}
                        <BiComment />
                    </button>
                </div>
            </div>
        </article>
    );
}
