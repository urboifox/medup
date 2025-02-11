import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Testimonial } from "./types";

export async function getTestimonials(options?: FetcherOptions) {
    return await fetcher<Testimonial[]>("/api/public/testimonials", options);
}
