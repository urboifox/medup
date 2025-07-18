import { AppComment } from "../comments/types";
import { Expert } from "../experts/types";
import { Speciality } from "../select-menu/types";

export type Idea = {
    id: number;
    title: string;
    created_at: string;
    expert: Expert;
    speciality: Speciality;
    description: string;
    orcid_number: string;
    comments_count: number;
    comments: AppComment[];
};
