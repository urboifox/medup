import { API_URL } from "@/constants";
import { ApiResponse } from "@/types/response";
import { useAuthStore } from "@/features/auth/store";

export type FetcherOptions = RequestInit & {
    params?: Record<string, string>;
    skipAuth?: boolean;
    skipLocale?: boolean;
};

export async function fetcherClient<T>(
    url: string,
    init?: FetcherOptions
): Promise<ApiResponse<T>> {
    let newUrl = url.startsWith("http") ? url : `${API_URL}${url}`;
    let locale = "en";

    if (!init?.skipLocale) {
        // TODO: Get locale from next-intl
        // const intlLocale = useLocale();
        // locale = intlLocale;
    }

    const requestInit: FetcherOptions = {
        ...init,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Locale: locale,
            ...(init?.headers || {})
        }
    };

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

    let res = await fetch(newUrl, requestInit);

    if (res.status === 401 && !requestInit.skipAuth) {
        // TODO: Refresh token and try again
        window.location.href = "/login";
    }

    if (!res.ok) {
        throw new Error("Error fetching data");
    }

    return res.json();
}
