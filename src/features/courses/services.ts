import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Course } from "./types";

export async function getCourses(options?: FetcherOptions) {
    return await fetcher<Course[]>("/api/public/courses", options);
}

export async function getCourse(id: string, options?: FetcherOptions) {
    return await fetcher<Course>("/api/public/courses/" + id, options);
}
