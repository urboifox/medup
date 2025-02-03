import { BaseEntity } from "@/types";

export type Skill = BaseEntity;

export type College = BaseEntity;

export type Speciality = BaseEntity & {
    college_id: number;
};

export type Country = BaseEntity;

export type City = BaseEntity & {
    country_id?: number;
};
