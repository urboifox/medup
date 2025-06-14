import { BaseEntity } from "@/types";

export type Skill = BaseEntity & {
    experts_count: number;
    posts_count: number;
    specialities?: number[];
    icon: string;
};

export type College = BaseEntity & {
    experts_count: number;
    icon: string;
    description: string;
};

export type Speciality = BaseEntity & {
    college_id?: number;
    experts_count: number;
    college?: College;
};

export type Country = BaseEntity;

export type City = BaseEntity & {
    country: Country;
};

export type CollegeWithSpeciality = BaseEntity & {
    specialities: Speciality[];
};
