import { ApiResponse } from "@/types/response";
import { User } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import { cookies } from "next/headers";

export async function getUser(): Promise<User | null> {
    const cookieStore = await cookies();
    if (!cookieStore.get("token")?.value) {
        return null;
    }

    try {
        const res = await fetcher<ApiResponse<User>>("/auth/profile", undefined);
        return res?.data as User;
    } catch (error) {
        return null;
    }
}
