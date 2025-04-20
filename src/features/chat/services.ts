import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Chat, ChatMessage } from "./types";

export async function getConversations(options?: FetcherOptions) {
    return await fetcher<Chat[]>("/api/conversations", {
        ...options,
        next: {
            tags: ["conversations"],
            ...options?.next
        }
    });
}

export async function getUserConversation(userId: string, options?: FetcherOptions) {
    return await fetcher<Chat>("/api/conversations/for?user_id=" + userId, {
        ...options,
        next: {
            tags: [`conversation-${userId}`],
            ...options?.next
        }
    });
}

export async function getMessages(conversationId: string, options?: FetcherOptions) {
    return await fetcher<ChatMessage[]>("/api/conversations/" + conversationId + "/messages", {
        ...options,
        next: {
            tags: ["messages"],
            ...options?.next
        }
    });
}
