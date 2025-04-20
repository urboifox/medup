import { create } from "zustand";
import { Chat, ChatMessage } from "./types";

interface ChatStore {
    messages: ChatMessage[];
    chats: Chat[];
    setInitialMessages: (messages: ChatMessage[]) => void;
    addMessagesPage: (messages: ChatMessage[]) => void;
    addMessage: (message: ChatMessage) => void;
    updateOrAddMessage: (message: ChatMessage) => void;
    deleteMessage: (id: string) => void;
    replaceMessage: (id: string, message: ChatMessage) => void;
    setChats: (chats: Chat[]) => void;
    updateOrAddChat: (chat: Chat) => void;
}

export const useChatStore = create<ChatStore>((set, get) => {
    return {
        messages: [],
        chats: [],
        setInitialMessages: (messages: ChatMessage[]) => set({ messages }),
        addMessagesPage: (messages: ChatMessage[]) => {
            const { messages: currentMessages } = get();
            set({ messages: [...messages, ...currentMessages] });
        },
        addMessage: (message: ChatMessage) => {
            const { messages: currentMessages } = get();
            set({ messages: [...currentMessages, message] });
        },
        deleteMessage: (id: string) => {
            const { messages: currentMessages } = get();
            set({ messages: currentMessages.filter((m) => m.id !== id) });
        },
        replaceMessage: (id: string, message: ChatMessage) => {
            const { messages: currentMessages } = get();
            set({ messages: currentMessages.map((m) => (m.id === id ? message : m)) });
        },
        setChats: (chats: Chat[]) => set({ chats }),
        updateOrAddChat: (chat: Chat) => {
            const { chats: currentChats } = get();
            const existingChat = currentChats.find((c) => c.id === chat.id);
            if (existingChat) {
                set({ chats: currentChats.map((c) => (c.id === chat.id ? chat : c)) });
            } else {
                set({ chats: [...currentChats, chat] });
            }
        },
        updateOrAddMessage: (message: ChatMessage) => {
            const { messages: currentMessages } = get();
            const existingMessage = currentMessages.find((m) => m.id === message.id);
            if (existingMessage) {
                set({ messages: currentMessages.map((m) => (m.id === message.id ? message : m)) });
            } else {
                set({ messages: [...currentMessages, message] });
            }
        }
    };
});
