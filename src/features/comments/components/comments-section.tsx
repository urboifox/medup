"use client";
import { useTranslations } from "next-intl";
import { AppComment } from "../types";
import { FaX } from "react-icons/fa6";
import { useActionState, useEffect, useState } from "react";
import { User } from "@/types/user";
import { useAuthStore } from "@/features/auth/store";
import { toast } from "sonner";
import { addCommentAction, likeCommentAction } from "../actions";
import { useRouter } from "next/navigation";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import { LuSend } from "react-icons/lu";
import CommentCard from "./comment-card";

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
    const [replyTo, setReplyTo] = useState<User | null>(null);

    const [state, action, pending] = useActionState(addCommentAction, { success: false });

    useEffect(() => {
        if (state.success) {
            setReplyTo(null);
            toast.success(t("common.commentAdded"));
            const pushTo = type === "idea" ? "/ideas/" : "/collaborate/";
            router.push(pushTo + commentableId, { scroll: true });
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

    async function handleLike(id: number) {
        if (!authUser) {
            toast.error(t("errors.mustBeLoggedIn"));
            return;
        }

        const { success } = await likeCommentAction(id);
        if (!success) {
            toast.error(t("errors.somethingWentWrong"));
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-2xl">{t("common.comments")}</h2>

            <div className="flex flex-col">
                {comments.length === 0 && (
                    <p className="text-dark-300">{t("common.noCommentsYet")}</p>
                )}
                {comments.map((comment) => (
                    <CommentCard
                        comment={comment}
                        key={comment.id}
                        onReply={handleReply}
                        onLike={handleLike}
                    />
                ))}
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
