"use client";
import { useLocale, useTranslations } from "next-intl";
import { AppComment } from "../types";
import Image from "next/image";
import { userTypesTranslationKey } from "@/constants";
import moment from "moment";
import { FaRegComment, FaX } from "react-icons/fa6";
import { useActionState, useEffect, useState } from "react";
import { User } from "@/types/user";
import { useAuthStore } from "@/features/auth/store";
import { toast } from "sonner";
import { addCommentAction } from "../actions";
import { useRouter } from "next/navigation";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import { LuSend } from "react-icons/lu";

export default function CommentsSection({
    comments,
    commentableId,
    type
}: {
    comments: AppComment[];
    commentableId: string;
    type: "idea" | "collaborate";
}) {
    const t = useTranslations();
    const router = useRouter();
    const locale = useLocale();
    const [replyTo, setReplyTo] = useState<User | null>(null);

    const [state, action, pending] = useActionState(addCommentAction, { success: false });

    useEffect(() => {
        if (state.success) {
            toast.success(t("common.commentAdded"));
            router.push("/ideas/" + commentableId, { scroll: true });
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, t, router, commentableId]);

    const authUser = useAuthStore((state) => state.user);

    function handleReply(replyUser: User) {
        if (!authUser) {
            toast.error(t("errors.mustBeLoggedIn"));
            return;
        }
        setReplyTo(replyUser);
        document.getElementById("comment-form")?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-2xl">{t("common.comments")}</h2>

            <div className="flex flex-col">
                {comments.length === 0 && (
                    <p className="text-dark-300">{t("common.noCommentsYet")}</p>
                )}
                {comments.map((comment) => {
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
                                        <h3 className="font-semibold text-sm">
                                            {comment.user.name}
                                        </h3>
                                        <p className="text-sm text-dark-300">
                                            {t(userTypesTranslationKey[comment.user.type])}
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
                            <button
                                onClick={() => handleReply(comment.user)}
                                className="flex items-center gap-2 text-dark-300 transition-colors duration-200 hover:text-dark-400 w-fit"
                            >
                                <FaRegComment />
                                {t("common.reply")}
                            </button>
                        </article>
                    );
                })}
            </div>

            {authUser && (
                <form
                    className="flex items-center gap-2"
                    id="comment-form"
                    action={(formData) => {
                        formData.set("commentable_id", commentableId);
                        formData.set("type", type);
                        if (replyTo) {
                            formData.set("replied_user_id", replyTo.id.toString());
                        }
                        action(formData);
                    }}
                >
                    <div className="relative w-full flex-col flex gap-2 items-start">
                        {replyTo && (
                            <div className="flex items-center gap-2 text-sm border border-dark-200 p-2 rounded-lg group hover:border-primary-main transition-colors duration-200 cursor-default">
                                <button
                                    onClick={() => setReplyTo(null)}
                                    className="transition-colors duration-200 hover:text-red-500 text-dark-200"
                                >
                                    <FaX />
                                </button>
                                <div className="flex items-center gap-2">
                                    {t("common.replyingTo")} {replyTo?.name}
                                </div>
                            </div>
                        )}
                        <Textarea
                            placeholder={t("placeholders.comment")}
                            name="content"
                            error={state?.errors?.content}
                            className="min-h-40"
                        />
                        <Button>
                            {t(pending ? "common.loading" : "common.send")}
                            <LuSend />
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
