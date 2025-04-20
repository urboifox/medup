"use client";
import { useAuthStore } from "@/features/auth/store";
import ChatForm from "@/features/chat/components/chat-form";
import { useChatStore } from "@/features/chat/store";
import { Chat, ChatMessage } from "@/features/chat/types";
import { useRealtimeStore } from "@/stores/realtime-store";
import { cn } from "@/utils/cn";
import moment from "moment";
import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { PiTimer } from "react-icons/pi";

export default function ChatPageClient({
    messages: initialMessages,
    conversation
}: {
    messages: ChatMessage[];
    conversation: Chat;
}) {
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const user = useAuthStore((state) => state.user);
    const client = useRealtimeStore((state) => state.client);

    const setInitialMessages = useChatStore((state) => state.setInitialMessages);
    const messages = useChatStore((state) => state.messages);
    const updateOrAddMessage = useChatStore((state) => state.updateOrAddMessage);
    const deleteMessage = useChatStore((state) => state.deleteMessage);

    useEffect(() => {
        const channel = client?.subscribe(`conversations.${conversation.id}`);
        channel?.bind("new-message", (data: any) => {
            const newMessage = data.message;
            if (newMessage.user.id !== user?.id) {
                updateOrAddMessage(newMessage);
            }
        });
        channel?.bind("message-deleted", (data: any) => {
            deleteMessage(data.messageId);
        });

        return () => {
            channel?.unbind("message-deleted");
            channel?.unbind("new-message");
        };
    }, [client, user]);

    useEffect(() => {
        setInitialMessages(initialMessages);
    }, [initialMessages, setInitialMessages]);

    function scrollToChatEnd() {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }

    useEffect(() => scrollToChatEnd(), [user]);

    return (
        <div className="flex flex-col gap-4">
            <div
                className="h-[calc(100dvh-320px)] overflow-y-auto flex flex-col"
                ref={messagesContainerRef}
            >
                <div className="grow"></div>
                {user && (
                    <div className="flex flex-col gap-2 w-full">
                        {messages?.map((message, index) => {
                            const isCurrentUser = message.user.id === user?.id;
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex flex-col gap-1",
                                        isCurrentUser && "self-end"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "flex gap-2 py-3 px-4 rounded-xl text-dark-400 bg-light-200 w-max max-w-lg",
                                            isCurrentUser && "bg-primary-main text-white"
                                        )}
                                    >
                                        <p>{message.content}</p>
                                        <div
                                            className={cn(
                                                "flex items-center gap-1",
                                                isCurrentUser && "self-end"
                                            )}
                                        >
                                            <time
                                                className={cn(
                                                    "text-[10px] font-medium shrink-0 text-dark-300",
                                                    isCurrentUser && "text-light-400"
                                                )}
                                            >
                                                {moment(message.created_at)
                                                    .locale(locale)
                                                    .format("hh:mm A")}
                                            </time>
                                            {isCurrentUser && (
                                                <span
                                                    className={
                                                        isCurrentUser
                                                            ? "text-light-400"
                                                            : "text-dark-300"
                                                    }
                                                >
                                                    {message.pending ? (
                                                        <PiTimer />
                                                    ) : (
                                                        <IoCheckmarkDoneOutline />
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <ChatForm scrollToChatEnd={scrollToChatEnd} conversation={conversation} />
        </div>
    );
}
