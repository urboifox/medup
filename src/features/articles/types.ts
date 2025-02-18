import { BaseEntity } from "@/types";

export type Article = {
    id: number;
    title: string;
    sub_title: string;
    user: string;
    created_at: string;
    image: string;
    tags: BaseEntity[];
    content: string;
};
