import { User } from "@/types/user";

export type AppComment = {
    id: number;
    created_at: string;
    content: string;
    user: User;
    replied_user?: User;
    likes_count: number;
    liked_by_user?: boolean;
};
