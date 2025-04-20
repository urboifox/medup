import { User } from "@/types/user";

export enum ChatMessageType {
    Text,
    Image,
    Video,
    Audio,
    Record,
    Document,
    Location
}

export type ChatMessage = {
    id: string;
    temp_id?: string;
    media?: string;
    media_object?: {
        name: string;
        type: string;
        size: number;
    };
    seen: boolean;
    created_at: string;
    content: string;
    user: User;
    pending?: boolean;
};

export type Chat = {
    id: string;
    other_user: User & {
        online: false;
        last_time_seen: null;
    };
    latest_message?: ChatMessage;
};

export type Conversation = {
    id: string;
    type: number;
    pinned: boolean;
    other_user: User & {
        online: false;
        last_time_seen: null;
    };
    latest_message: ChatMessage;
};
