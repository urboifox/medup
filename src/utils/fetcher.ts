import "server-only";
import { API_URL } from "@/constants";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { refreshToken } from "./refresh-token";
import { ApiResponse } from "@/types/response";

export type FetcherOptions = RequestInit & {
    params?: Record<string, string>;
    skipAuth?: boolean;
};

async function getAuthToken(): Promise<string | null> {
    const cookiesStore = await cookies();
    let token = cookiesStore.get("token")?.value;

    if (!token && cookiesStore.get("refreshToken")?.value) {
        const newTokenData = await refreshToken();
        if (newTokenData) {
            token = newTokenData.token;
        } else {
            redirect("/login");
        }
    }
    return token || null;
}

export async function fetcher<T>(url: string, init?: FetcherOptions): Promise<ApiResponse<T>> {
    let newUrl = url.startsWith("http") ? url : `${API_URL}${url}`;

    const requestInit: FetcherOptions = {
        ...init,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(init?.headers || {})
        }
    };

    if (!init?.skipAuth) {
        const token = await getAuthToken();
        requestInit.headers = {
            ...requestInit.headers,
            Authorization: `Bearer ${token}`
        };
    }

    if (requestInit?.params) {
        const params = new URLSearchParams(requestInit?.params);
        newUrl = `${newUrl}?${params.toString()}`;
    }

    let res = await fetch(newUrl, requestInit);

    if (res.status === 401 && !requestInit.skipAuth) {
        const newTokenData = await refreshToken();
        if (newTokenData) {
            requestInit.headers = {
                ...requestInit.headers,
                Authorization: `Bearer ${newTokenData.token}`
            };
            res = await fetch(newUrl, requestInit);
        } else {
            redirect("/login");
        }
    }

    if (!res.ok) {
        throw new Error("Error fetching data");
    }

    return res.json();
}
