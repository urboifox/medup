import { fetcher } from "@/utils/fetcher";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();

    try {
        await fetcher("/auth/logout", { method: "POST" });
    } catch (error) {
        return NextResponse.json({ message: "Error logging out on server" });
    } finally {
        cookieStore.delete("token");
        cookieStore.delete("refreshToken");
    }

    return NextResponse.json({ message: "Logged out successfully" });
}
