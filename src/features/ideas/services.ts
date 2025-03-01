import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Idea } from "./types";

export async function getIdeas(options?: FetcherOptions) {
    return await fetcher<Idea[]>("/api/public/ideas", options);
}

export async function getIdea(id: string, options?: FetcherOptions) {
    return await fetcher<Idea>("/api/public/ideas/" + id, options);
}
