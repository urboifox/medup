import { User } from "@/types/user";
import { fetcher } from "@/utils/fetcher";
import { cookies } from "next/headers";

export async function getUser(): Promise<User | null> {
    const cookieStore = await cookies();
    if (!cookieStore.get("refreshToken")?.value) {
        return null;
    }

    const res = await fetcher<User>("/auth/profile");

    return res.data as User;
}
