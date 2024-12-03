import { cookies } from "next/headers";
import "server-only";

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    const res: Response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options?.headers
        }
    }).catch((err) => {
        console.error("", err);
        return err;
    });

    if (!res.ok) {
        const body = await res.text();
        console.error(`Error ${res.status} (${url}): ${res.statusText} ${body}`);
        throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json().catch((err: unknown) => {
        if (err instanceof Error) {
            console.error(`Error parsing JSON ${url}: ${err.message}`);
            throw new Error(err.message);
        }
        throw err;
    });

    return data as T;
}
