import { ApiResponse } from "@/types/response";
import { User } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import { cookies } from "next/headers";

export async function getUser(): Promise<User | null> {
    const cookieStore = await cookies();
    if (!cookieStore.get("refreshToken")?.value) {
        return null;
    }

    try {
        const res = await fetcher<ApiResponse<User>>("/auth/profile");
        return res?.data as User;
    } catch {
        return null;
    }
}
