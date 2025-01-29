import { API_URL } from "@/constants";
import { cookies } from "next/headers";

export async function refreshToken() {
    const cookiesStore = await cookies();

    const res = await fetch(API_URL + "/auth/refresh_tokens/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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
}
