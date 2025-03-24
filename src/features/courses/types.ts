import { Expert } from "../experts/types";
import { Speciality } from "../select-menu/types";

export type Course = {
    id: number;
    name: string;
    price: number;
    cover: string;
    rating_average: number;
    description: string;
    expert: Expert;
    speciality: Speciality;
    created_at: string;
    purchased: boolean;
    public_link?: string;
};
