export function getErrorMessage(error: unknown): string | null {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }

    if (error && typeof error === "object" && "message" in error) {
        return String(error.message);
    }

    return null;
}
