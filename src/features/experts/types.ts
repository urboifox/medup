import { User } from "@/types/user";

export type Skill = {
    id: number;
    name: string;
};

export type College = {
    id: number;
    name: string;
};

export type Speciality = {
    id: number;
    name: string;
    college: College;
};

export type Country = {
    id: number;
    name: string;
};

export type City = {
    id: number;
    name: string;
    country: Country;
};

export type Expert = {
    id: number;
    rating_average: number;
    is_premium: boolean;
    city: City;
    speciality: Speciality;
    skills: Skill[];
    user: User;
};
