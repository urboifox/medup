import { Expert } from "../experts/types";
import { Speciality } from "../select-menu/types";

export type Collaborate = {
    id: number;
    title: string;
    price?: number;
    created_at: string;
    expert: Expert;
    speciality: Speciality;
    description: string;
    orcid_number: string;
};
