export enum UserType {
    Expert = 1,
    Trainee,
    Student,
    Researcher
}

export type User = {
    id: number;
    email: string;
    name: string;
    avatar: string;
    type: UserType;
    created_at: string;
};
