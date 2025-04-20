"use client";

import { useAuthStore } from "@/features/auth/store";
import { useChatStore } from "@/features/chat/store";
import { Chat } from "@/features/chat/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import MessagesSidebar from "@/features/chat/components/messages-sidebar";

export default function MessagesLayoutClient({
    children,
    conversations
}: {
    children: React.ReactNode;
    conversations: Chat[];
}) {
    const { userId } = useParams();
    const user = useAuthStore((state) => state.user);
    const setConversations = useChatStore((state) => state.setChats);

    useEffect(() => {
        setConversations(conversations);
    }, [user, conversations]);

    return user && <div className="xl:hidden">{userId ? children : <MessagesSidebar />}</div>;
}
