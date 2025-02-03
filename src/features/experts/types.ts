import { BaseEntity } from "@/types";
import { User } from "@/types/user";
import { City, Skill, Speciality } from "../select-menu/types";

export type Expert = {
    id: number;
    rating_average: number;
    is_premium: boolean;
    city: City;
    speciality: Speciality;
    skills: Skill[];
    user: User;
};
