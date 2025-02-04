import { BaseEntity } from "@/types";

export type Skill = BaseEntity & {
    experts_count: number;
};

export type College = BaseEntity & {
    experts_count: number;
};

export type Speciality = BaseEntity & {
    college_id: number;
    experts_count: number;
};

export type Country = BaseEntity;

export type City = BaseEntity & {
    country_id?: number;
};
