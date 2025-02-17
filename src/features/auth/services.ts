import { User } from "@/types/user";
import { fetcher, FetcherOptions } from "@/utils/fetcher";

export async function getBasicProfile(options?: FetcherOptions) {
    return await fetcher<User>("/auth/profile", options);
}
