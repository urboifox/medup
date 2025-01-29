import { API_URL } from "@/constants";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { refreshToken } from "./refresh-token";

export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const requestUrl = url.startsWith("http") ? url : `${API_URL}${url}`;

    const newInit = {
        ...init,
        headers: {
            ...init?.headers,
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : ""
        }
    };

    if (!token && cookiesStore.get("refreshToken")?.value) {
        const newTokenData = await refreshToken();
        if (newTokenData) {
            newInit.headers.Authorization = `Bearer ${newTokenData.token}`;
        } else {
            redirect("/login");
        }
    }

    try {
        let res = await fetch(requestUrl, newInit);

        if (res.status === 401) {
            const newTokenData = await refreshToken();
            if (newTokenData) {
                newInit.headers.Authorization = `Bearer ${newTokenData.token}`;
                res = await fetch(requestUrl, newInit);
            } else {
                redirect("/login");
            }
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching", url);
        console.error(error);
        throw error;
    }
}
