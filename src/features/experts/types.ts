import { User } from "@/types/user";
import { City, College, Skill } from "../select-menu/types";
import { BaseEntity } from "@/types";

export type ExpertSpeciality = BaseEntity & {
    college: College;
};

export enum ExprtWorkType {
    FullTime = 0,
    PartTime,
    Remotely
}

export type ExpertExperience = {
    id: number;
    hospital_name: string;
    job_title: string;
    start_date: string;
    end_date: string;
    work_type: ExprtWorkType;
    experience_years: number;
    content: string;
    city: City;
};

export type Expert = {
    id: number;
    rating_average: number;
    is_premium: boolean;
    city: City;
    headline: string;
    speciality: ExpertSpeciality;
    skills: Skill[];
    experience_years: number | null;
    experiences: ExpertExperience[];
    user: User;
};
