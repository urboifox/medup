"use client";
import Button from "@/components/ui/button";
import { Expert } from "../types";
import { useTranslations } from "next-intl";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useRouter } from "@/i18n/routing";

export default function ExpertProfileActionButton({ expert }: { expert: Expert }) {
    const t = useTranslations();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push('/messages');
        console.log("chat now with", expert.user.id);
    }

    return (
        <form onSubmit={handleSubmit} className="self-end">
            <Button className="w-fit self-end" type="submit">
                {t("experts.chatNow")}
                <span className="rtl:rotate-180">
                    <HiOutlineArrowSmallRight size={20} />
                </span>
            </Button>
        </form>
    );
}
