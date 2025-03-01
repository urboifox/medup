import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { AppComment } from "./types";

export async function getComments(options?: FetcherOptions) {
    return await fetcher<AppComment[]>("/api/public/comments", {
        ...options,
        next: {
            tags: ["comments"],
            ...options?.next
        }
    });
}
