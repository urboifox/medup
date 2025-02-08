import { API_URL } from "@/constants";
import { ApiResponse } from "@/types/response";
import { useAuthStore } from "@/features/auth/store";
import { FetcherError } from "@/lib/exceptions";

export type FetcherClientOptions = RequestInit & {
    params?: Record<string, string>;
    skipAuth?: boolean;
    skipLocale?: boolean;
    skipHeaders?: boolean;
};

export async function fetcherClient<T>(
    url: string,
    init?: FetcherClientOptions
): Promise<ApiResponse<T>> {
    let newUrl = url.startsWith("http") ? url : `${API_URL}${url}`;

    const requestInit: FetcherClientOptions = init || {};

    if (!init?.skipLocale) {
        // TODO: Get locale from next-intl
        // const intlLocale = useLocale();
        // locale = intlLocale;
    }

    if (!init?.skipHeaders) {
        requestInit.headers = {
            ...requestInit.headers,
            "Content-Type": "application/json",
            Accept: "application/json"
        };
    }

    if (!init?.skipAuth) {
        const token = useAuthStore.getState().token;
        requestInit.headers = {
            ...requestInit.headers,
            Authorization: `Bearer ${token}`
        };
    }

    if (requestInit?.params) {
        const params = new URLSearchParams(requestInit?.params);
        newUrl = `${newUrl}?${params.toString()}`;
    }

    const res = await fetch(newUrl, requestInit);

    if (res.status === 401 && !requestInit.skipAuth) {
        // TODO: Refresh token and try again
        window.location.href = "/login";
    }

    const data = await res.json();

    if (!res.ok) {
        throw new FetcherError("Error fetching data from:" + newUrl, data);
    }

    return data;
}
