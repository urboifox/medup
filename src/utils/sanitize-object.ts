export function sanitizeObject(obj: Record<string, string | undefined | null>) {
    const newObj: Record<string, string> = {};

    for (const key in obj) {
        if (obj[key] === undefined || obj[key] === null) {
            continue;
        }

        newObj[key] = obj[key];
    }

    return newObj;
}
