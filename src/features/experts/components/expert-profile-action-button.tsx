"use client";
import Button from "@/components/ui/button";
import { Expert } from "../types";
import { useTranslations } from "next-intl";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

export default function ExpertProfileActionButton({ expert }: { expert: Expert }) {
    const t = useTranslations();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("chat now with", expert.user.id);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button className="w-fit self-end" type="submit">
                {t("experts.chatNow")}
                <span className="rtl:rotate-180">
                    <HiOutlineArrowSmallRight size={20} />
                </span>
            </Button>
        </form>
    );
}
