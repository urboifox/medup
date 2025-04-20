"use client";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Chat } from "../types";
import { useParams } from "next/navigation";

export default function ChatSidebarItem({ conversation }: { conversation: Chat }) {
    const t = useTranslations();
    const locale = useLocale();
    const params = useParams();
    const isActive = conversation.other_user.id.toString() === params.userId;

    return (
        <Link
            href={`/messages/${conversation.other_user.id}`}
            className={cn(
                "flex flex-start gap-2 p-4 rounded-md w-full transition-colors duration-100",
                isActive ? "bg-light-300" : "hover:bg-light-200"
            )}
        >
            <Image
                src={conversation.other_user.avatar}
                alt={conversation.other_user.name}
                width={48}
                height={48}
                className="rounded-xl object-cover h-[48px] w-[48px]"
            />
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between gap-1 w-full">
                    <h5 className="font-semibold line-clamp-1 break-all" title={"Mohamed Fox"}>
                        {conversation.other_user.name}
                    </h5>
                    <span className="text-xs text-dark-300 font-medium shrink-0">
                        {conversation.latest_message
                            ? moment(conversation.latest_message?.created_at)
                                  .locale(locale)
                                  .fromNow()
                            : ""}
                    </span>
                </div>
                <p className="line-clamp-1 text-sm text-dark-300">
                    {conversation.latest_message?.content ?? t("common.newChat")}
                </p>
            </div>
        </Link>
    );
}
