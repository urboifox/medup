"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import moment from "moment";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { RiAttachmentLine } from "react-icons/ri";

export default function ChatPage() {
    const locale = useLocale();
    const temp = [
        {
            content: "Hello, Fox!"
        },
        {
            content: "Well, hey there! I'm great",
            userId: 1
        },
        {
            content: "I'm doing great too! How about you?"
        },
        {
            content: "Me too! I'm doing great too!",
            userId: 1
        },
        {
            content: "Hey, Fox! How are you doing?",
            userId: 1
        }
    ];
    const messages = Array(10).fill(temp).flat();

    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-4 h-full">
            <header className="rounded-lg p-4 border-b border-light-300 flex items-center justify-between gap-2">
                <Link className={"flex flex-start gap-2"} href="/experts/1">
                    <Image
                        src="https://medup.mohamed-emad.com/storage/default/user.png"
                        alt="User"
                        width={48}
                        height={48}
                        className="rounded-xl object-cover h-[48px] w-[48px]"
                    />
                    <div className="flex flex-col gap-1 w-full">
                        <h5 className="font-semibold line-clamp-1 break-all" title={"Mohamed Fox"}>
                            Mohamed Fox
                        </h5>
                        <p className="line-clamp-1 text-sm text-dark-300 font-medium">
                            Egypt, Alexandria
                        </p>
                    </div>
                </Link>
                <Button size="sm">Open Digital Contract</Button>
            </header>

            <div className="flex flex-col gap-4">
                <div
                    className="h-[calc(100dvh-300px)] overflow-y-auto flex flex-col"
                    ref={messagesContainerRef}
                >
                    <div className="grow"></div>
                    <div className="flex flex-col gap-2 w-full">
                        {messages.map((message, index) => {
                            const isCurrentUser = message.userId === 1;

                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex flex-col gap-2 p-4 rounded-xl text-dark-400 bg-light-200 w-max max-w-lg",
                                        isCurrentUser && "bg-primary-main text-white self-end"
                                    )}
                                >
                                    <p className="text-sm">{message.content}</p>
                                    <span className="text-xs text-dark-200 font-medium shrink-0 self-end">
                                        {moment(Date.now()).locale(locale).format("hh:mm A")}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <form className="flex items-center gap-3 w-full">
                    <button className="transition-colors duration-200 hover:text-primary-main">
                        <RiAttachmentLine size={24} />
                    </button>
                    <div className="relative w-full">
                        <Input placeholder="Type a message" className="pe-10" />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-dark-300 font-medium">
                            <Image src="/icons/send-arrow.svg" alt="Send" width={24} height={24} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
