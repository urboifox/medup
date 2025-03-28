import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Collaborate } from "./types";

export async function getCollaborateContent(options?: FetcherOptions) {
    return await fetcher<Collaborate[]>("/api/public/collaborates", options);
}

export async function getCollaborateItem(id: string, options?: FetcherOptions) {
    return await fetcher<Collaborate>("/api/public/collaborates/" + id, options);
}
