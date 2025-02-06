import { useState } from "react";

export function useCachedForm(): [FormData, (e: React.FormEvent<HTMLFormElement>) => void] {
    const [cache, setCache] = useState<FormData>(new FormData());

    function handleCache(e: React.FormEvent<HTMLFormElement>) {
        setCache(new FormData(e.currentTarget));
    }

    return [cache, handleCache];
}
