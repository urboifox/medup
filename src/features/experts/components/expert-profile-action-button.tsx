"use client";
import Button from "@/components/ui/button";
import { Expert } from "../types";
import { useTranslations } from "next-intl";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useAuthStore } from "@/features/auth/store";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createConversationAction } from "@/features/chat/actions";
import { toast } from "sonner";

export default function ExpertProfileActionButton({ expert }: { expert: Expert }) {
    const t = useTranslations();
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const [state, action, pending] = useActionState(createConversationAction, { success: false });

    useEffect(() => {
        if (state.success) {
            router.push(`/messages/${expert.user.id}`);
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state]);

    function handleClick(e: React.FormEvent<HTMLButtonElement>) {
        if (user?.id === expert.user.id) {
            e.preventDefault();
            toast.error(t("experts.youCantChatWithYourself"));
        }
    }

    return (
        <form
            action={(formData) => {
                formData.set("expert_id", expert.user.id.toString());
                action(formData);
            }}
            className="self-end"
        >
            <Button
                className="w-fit self-end"
                type="submit"
                disabled={pending}
                onClick={handleClick}
            >
                {t("experts.chatNow")}
                <span className="rtl:rotate-180">
                    <HiOutlineArrowSmallRight size={20} />
                </span>
            </Button>
        </form>
    );
}
