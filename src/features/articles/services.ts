import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Article } from "./types";

export async function getAllArticles(options?: FetcherOptions) {
    return await fetcher<Article[]>("/api/public/blogs", options);
}

export async function getArticle(id: string, options?: FetcherOptions) {
    return await fetcher<Article>("/api/public/blogs/" + id, options);
}
