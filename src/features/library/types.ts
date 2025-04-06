import { Expert } from "../experts/types";
import { Speciality } from "../select-menu/types";

export type LibraryItem = {
    id: number;
    title: string;
    price: number;
    cover: string;
    created_at: string;
    pages_count: number;
    description: string;
    expert: Expert;
    speciality: Speciality;
    purchased: boolean;
    rating_average: number;
    order_id: number;
    reviewed: boolean;
};
