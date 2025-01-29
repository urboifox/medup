import { API_URL } from "@/constants";
import { useAuthStore } from "@/features/auth/store";
import { cookies } from "next/headers";

export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
    let token;
    const requestUrl = url.startsWith("http") ? url : `${API_URL}${url}`;

    if (typeof window === "undefined") {
        const cookiesStore = await cookies();
        token = cookiesStore.get("token")?.value;
    } else {
        token = useAuthStore.getState().token;
    }

    try {
        const res = await fetch(requestUrl, {
            ...init,
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
                ...init?.headers
            }
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching", url);
        console.error(error);
        throw error;
    }
}
