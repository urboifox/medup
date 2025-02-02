import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Expert } from "./types";
import { ApiResponse } from "@/types/response";

export async function getAllExperts(options?: FetcherOptions) {
    return fetcher<ApiResponse<Expert[]>>("/api/public/experts", options);
}
