import { User } from "@/types/user";
import { City, College, Skill } from "../select-menu/types";
import { BaseEntity } from "@/types";

export type ExpertSpeciality = BaseEntity & {
    college: College;
};

export type Expert = {
    id: number;
    rating_average: number;
    is_premium: boolean;
    city: City;
    speciality: ExpertSpeciality;
    skills: Skill[];
    user: User;
};
