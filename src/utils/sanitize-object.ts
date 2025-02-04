export function sanitizeObject(obj: Record<string, any>) {
    const newObj: Record<string, any> = {};

    for (const key in obj) {
        if (obj[key] === undefined || obj[key] === null) {
            continue;
        }

        newObj[key] = obj[key];
    }

    return newObj;
}
