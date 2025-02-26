import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryString(scroll = false) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback(
        (entry: { [key: string]: string } | string, value?: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (typeof entry === "string") {
                if (value) {
                    params.set(entry, value);
                    router.push(pathname + "?" + params.toString(), { scroll });
                }
                return;
            }

            Object.keys(entry).forEach((key) => params.set(key, entry[key]));
            router.push(pathname + "?" + params.toString(), { scroll });
        },
        [searchParams, pathname, router]
    );

    const getQueryString = useCallback(
        (name: string) => {
            return searchParams.get(name);
        },
        [searchParams]
    );

    const removeQueryString = useCallback(
        (...names: string[]) => {
            const params = new URLSearchParams(searchParams.toString());
            names.forEach((name) => params.delete(name));

            router.push(pathname + "?" + params.toString(), { scroll });
        },
        [searchParams, pathname, router]
    );

    return {
        createQueryString,
        getQueryString,
        removeQueryString,
        pathname,
        router
    };
}
