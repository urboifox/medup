"use client";
import Input from "@/components/ui/input";
import ChatSidebarItem from "./chat-sidebar-item";
import { useChatStore } from "../store";
import { useAuthStore } from "@/features/auth/store";
import { useRealtimeStore } from "@/stores/realtime-store";
import { useEffect } from "react";

export default function MessagesSidebar() {
    const conversations = useChatStore((state) => state.chats);
    const userId = useAuthStore((state) => state.user?.id);
    const updateOrAddConversation = useChatStore((state) => state.updateOrAddChat);
    const client = useRealtimeStore((state) => state.client);

    useEffect(() => {
        const channel = client?.subscribe(`chat.${userId}`);
        channel?.bind("conversation-updated", (data: any) => {
            updateOrAddConversation(data.conversation);
        });

        return () => {
            channel?.unbind("conversation-updated");
        };
    }, [client, userId]);

    return (
        <div className="flex flex-col gap-4 border-e border-light-300">
            <h3 className="text-xl font-semibold flex items-center gap-2">
                Your Messages
                <span className="rounded-full px-3 py-1 text-foreground-main text-sm bg-light-200 font-semibold">
                    {conversations.length}
                </span>
            </h3>
            <hr />

            <div className="flex flex-col gap-2">
                <div className="pe-4">
                    <Input placeholder="Search messages or experts" />
                </div>
                <ul className="flex flex-col pe-2 overflow-y-auto h-[calc(100vh-260px)]">
                    {conversations.map((conversation, index) => {
                        return (
                            <li key={index}>
                                <ChatSidebarItem conversation={conversation} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
