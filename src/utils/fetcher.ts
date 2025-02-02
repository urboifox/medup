import "server-only";
import { API_URL } from "@/constants";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { refreshToken } from "./refresh-token";
import { getErrorMessage } from "@/lib/get-error-message";
import { getTranslations } from "next-intl/server";

export type FetcherOptions = RequestInit & {
    params?: Record<string, string>;
    skipAuth?: boolean;
};

export type FetcherSuccess<T> = {
    success: true;
    data: T;
};

export type FetcherError = {
    success: false;
    error: string;
    status?: number;
    data?: unknown;
};

export type FetcherResponse<T> = FetcherSuccess<T> | FetcherError;

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

export async function fetcher<T>(
    url: string,
    init: FetcherOptions = {}
): Promise<FetcherResponse<T>> {
    let requestUrl = url.startsWith("http") ? url : `${API_URL}${url}`;

    if (init.params) {
        const params = new URLSearchParams(init.params);
        requestUrl = `${requestUrl}?${params.toString()}`;
    }

    const token = init.skipAuth ? null : await getAuthToken();

    const requestInit: RequestInit = {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    };

    try {
        let res = await fetch(requestUrl, requestInit);

        if (res.status === 401 && !init.skipAuth) {
            const newTokenData = await refreshToken();
            if (newTokenData) {
                requestInit.headers = {
                    ...requestInit.headers,
                    Authorization: `Bearer ${newTokenData.token}`
                };
                res = await fetch(requestUrl, requestInit);
            } else {
                redirect("/login");
            }
        }

        const contentType = res.headers.get("Content-Type");
        const data = contentType?.includes("application/json")
            ? await res.json()
            : await res.text();

        if (!res.ok) {
            return { success: false, error: res.statusText, status: res.status, data };
        }

        return { success: true, data: data as T } as FetcherSuccess<T>;
    } catch (error) {
        const t = await getTranslations();
        return {
            success: false,
            error: getErrorMessage(error) || t("errors.somethingWentWrong")
        };
    }
}

export function isSuccess<T>(response: FetcherResponse<T>): response is FetcherSuccess<T> {
    return response.success;
}
