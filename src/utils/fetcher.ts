import "server-only";
import { API_URL } from "@/constants";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { refreshToken } from "./refresh-token";
import { ApiResponse } from "@/types/response";
import { getLocale } from "next-intl/server";
import { FetcherError } from "@/lib/exceptions";

export type FetcherOptions = RequestInit & {
    params?: Record<string, string>;
    skipAuth?: boolean;
    skipLocale?: boolean;
    skipHeaders?: boolean;
};

export async function getAuthToken(): Promise<string | null> {
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

    const requestInit: FetcherOptions = init || {};

    if (!init?.skipLocale) {
        const locale = await getLocale();
        requestInit.headers = {
            ...requestInit.headers,
            Locale: locale
        };
    }

    if (!init?.skipHeaders) {
        requestInit.headers = {
            ...requestInit.headers,
            "Content-Type": "application/json",
            Accept: "application/json"
        };
    }

    if (!init?.skipAuth) {
        const token = await getAuthToken();
        if (token) {
            requestInit.headers = {
                ...requestInit.headers,
                Authorization: `Bearer ${token}`
            };
        }
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
            if (!res.ok) {
                redirect("/logout");
            }
        } else {
            redirect("/logout");
        }
    }

    let data: ApiResponse<T>;
    try {
        data = await res.json();
    } catch (error) {
        console.error("Error fetching data from:" + url, error);
        throw new FetcherError("Error getting requested resource", error);
    }

    if (!res.ok) {
        console.error("Error fetching data from:" + url, data);
        throw new FetcherError("Error getting requested resource", data);
    }

    return data;
}
