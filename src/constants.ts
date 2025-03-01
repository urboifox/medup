import { UserType } from "./types/user";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userTypesTranslationKey = {
    [UserType.Expert]: "common.expert",
    [UserType.Trainee]: "common.trainee",
    [UserType.Student]: "common.student",
    [UserType.Researcher]: "common.researcher"
} as const;
