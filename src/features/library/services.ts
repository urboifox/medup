import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { LibraryItem } from "./types";

export async function getLibrary(options?: FetcherOptions) {
    return await fetcher<LibraryItem[]>("/api/public/library", options);
}

export async function getCourse(id: string, options?: FetcherOptions) {
    return await fetcher<LibraryItem>("/api/public/library/" + id, options);
}
