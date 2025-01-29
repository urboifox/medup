import { API_URL } from "@/constants";
import { cookies } from "next/headers";

export async function rotateToken() {
    const cookiesStore = await cookies();

    try {
        const res = await fetch(API_URL + "/auth/refresh_tokens/rotate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${cookiesStore.get("token")?.value}`
            },
            body: JSON.stringify({ token: cookiesStore.get("refreshToken")?.value })
        });

        const data = await res.json();
        const newToken = data.data?.token;
        const newExpires = data.data?.token_expires_at;

        if (newToken) {
            return { token: newToken, expires: newExpires };
        } else {
            return null;
        }
    } catch {
        return null;
    }
}
