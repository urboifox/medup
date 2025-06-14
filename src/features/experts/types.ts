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

export type Subscription = {
    id: number;
    starts_at: string;
    ends_at: string;
    paid: boolean;
};

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

export type ExpertCertification = {
    id: number;
    name: string;
    date: string;
    file: string;
};

export type Review = {
    id: number;
    rating: number;
    description: string;
    created_at: string;
    user: {
        id: number;
        avatar: string;
        first_name: string;
        middle_name: string;
        name: string;
    };
};

export type Expert = {
    reviewed?: boolean;
    id: number;
    rating_average: number;
    is_premium: boolean;
    city: City;
    headline: string;
    speciality: ExpertSpeciality;
    skills: Skill[];
    social_contacts: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        email?: string;
    };
    experience_years: number | null;
    experiences: ExpertExperience[];
    certification: ExpertCertification;
    cv: string;
    user: User;
    degree: string;
    education: string;
    graduation_year: number;
    reviews: Review[];
};
