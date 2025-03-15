import { userTypesTranslationKey } from "@/constants";
import { User } from "@/types/user";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { AppComment } from "../types";

interface Props {
    comment: AppComment;
    onReply: (user: User) => void;
    onLike: (id: number) => void;
}

export default function CommentCard({ comment, onLike, onReply }: Props) {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <article
            className="[&:not(:last-child)]:border-b border-b-light-400 flex flex-col gap-4 p-4"
            key={comment.id}
        >
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        width={36}
                        height={36}
                        className="rounded-full object-cover aspect-square w-9"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-sm">{comment.user.name}</h3>
                        <p className="text-sm text-dark-300">
                            {t(
                                userTypesTranslationKey[
                                    comment.user.type as keyof typeof userTypesTranslationKey
                                ]
                            )}
                        </p>
                    </div>
                </div>
                <span className="text-xs font-medium">
                    {moment(comment.created_at).locale(locale).fromNow()}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                {comment.replied_user && (
                    <span className="text-xs text-dark-300 font-medium">
                        {t("common.replyingTo")} {comment.replied_user?.name}
                    </span>
                )}
                <p>{comment.content}</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onLike(comment.id)}
                    className="flex items-center gap-1 text-dark-300 transition-colors duration-200 hover:text-dark-400 w-fit"
                >
                    {comment.liked_by_user ? (
                        <span className="text-primary-main">
                            <FaThumbsUp />
                        </span>
                    ) : (
                        <FaRegThumbsUp />
                    )}
                    {comment.likes_count}
                </button>
                <button
                    onClick={() => onReply(comment.user)}
                    className="flex items-center gap-2 text-dark-300 transition-colors duration-200 hover:text-dark-400 w-fit"
                >
                    <FaRegComment />
                    {t("common.reply")}
                </button>
            </div>
        </article>
    );
}
