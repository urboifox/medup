import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Expert } from "./types";

export async function getAllExperts(options?: FetcherOptions) {
    return await fetcher<Expert[]>("/api/public/experts", options);
}

export async function getExpert(id: string, options?: FetcherOptions) {
    return await fetcher<Expert>("/api/public/experts/" + id, options);
}
