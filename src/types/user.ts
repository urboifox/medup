export enum UserType {
    Expert = 1,
    Trainee,
    Student,
    Researcher
}

export type User = {
    id: number;
    email: string;
    phone: string;
    name: string;
    first_name: string;
    middle_name: string;
    avatar: string;
    type: UserType;
    created_at: string;
    is_premium: boolean;
};
