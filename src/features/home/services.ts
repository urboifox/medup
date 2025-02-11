import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Testimonial } from "./types";
import { College } from "../select-menu/types";

export async function getTestimonials(options?: FetcherOptions) {
    return await fetcher<Testimonial[]>("/api/public/testimonials", options);
}

export async function getColleges(options?: FetcherOptions) {
    return await fetcher<College[]>("/api/public/colleges", options);
}
