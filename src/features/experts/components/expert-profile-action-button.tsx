"use client";
import Button from "@/components/ui/button";
import { Expert } from "../types";
import { useTranslations } from "next-intl";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useAuthStore } from "@/features/auth/store";
import { FaEdit } from "react-icons/fa";

export default function ExpertProfileActionButton({ expert }: { expert: Expert }) {
    const t = useTranslations();
    const user = useAuthStore((state) => state.user);

    async function handleChatNow() {
        console.log("chat now with", expert.user.id);
    }

    return (
        <>
            {user?.id === expert.user.id ? (
                <Button className="w-fit self-end" variant="secondary">
                    <FaEdit size={20} />
                    {t("experts.editProfile")}
                </Button>
            ) : (
                <Button className="w-fit self-end" onClick={handleChatNow}>
                    {t("experts.chatNow")}
                    <span className="rtl:rotate-180">
                        <HiOutlineArrowSmallRight size={20} />
                    </span>
                </Button>
            )}
        </>
    );
}
