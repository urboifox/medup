import { API_URL } from "@/constants";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const t = await getTranslations();
    const cookieStore = await cookies();
    const formData = await request.formData();
    const payload = Object.fromEntries(formData) as Record<string, string>;

    try {
        const res = await fetch(API_URL + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (res.ok) {
            cookieStore.set("token", data?.data?.token, {
                path: "/",
                expires: new Date(data?.data?.token_expires_at),
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production"
            });
            cookieStore.set("refreshToken", data?.data?.refresh_token, {
                path: "/",
                expires: new Date(data?.data?.refresh_token_expires_at),
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production"
            });
        }

        return NextResponse.json(data, { status: res.status });
    } catch {
        return NextResponse.json({ message: t("errors.somethingWentWrong") }, { status: 500 });
    }
}
