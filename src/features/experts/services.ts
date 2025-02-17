import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Expert, ExpertCertification, ExpertExperience } from "./types";

export async function getAllExperts(options?: FetcherOptions) {
    return await fetcher<Expert[]>("/api/public/experts", options);
}

export async function getExpert(id: string, options?: FetcherOptions) {
    return await fetcher<Expert>("/api/public/experts/" + id, options);
}

export async function getExpertProfile(options?: FetcherOptions) {
    return await fetcher<Expert>("/api/experts/me", options);
}

export async function getProfileExperiences(options?: FetcherOptions) {
    return await fetcher<ExpertExperience[]>("/api/experts/experiences", options);
}

export async function getProfileCertification(options?: FetcherOptions) {
    return await fetcher<ExpertCertification>("/api/experts/certification", options);
}
