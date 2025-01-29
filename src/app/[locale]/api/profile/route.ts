import { API_URL } from "@/constants";
import { refreshToken } from "@/utils/refresh-token";
import { rotateToken } from "@/utils/rotate-token";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const t = await getTranslations();
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    if (!token && cookieStore.get("refreshToken")?.value) {
        const newTokenData = await refreshToken();
        if (newTokenData) {
            token = newTokenData.token;
            cookieStore.set("token", newTokenData.token, {
                path: "/",
                expires: new Date(newTokenData.expires),
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production"
            });
        } else {
            cookieStore.delete("token");
            cookieStore.delete("refreshToken");
            return NextResponse.redirect(new URL("/login", request.url));
        }
        const refreshTokenExpiresAt = String(cookieStore.get("refreshTokenExpiresAt")?.value);
        const expiresAt = new Date(refreshTokenExpiresAt);
        const now = new Date();
        if (expiresAt.getTime() - now.getTime() < 24 * 60 * 60 * 1000 || !refreshTokenExpiresAt) {
            const rotatedToken = await rotateToken();
            if (rotatedToken) {
                cookieStore.set("refreshToken", rotatedToken.token, {
                    path: "/",
                    expires: new Date(rotatedToken.expires),
                    httpOnly: true,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production"
                });
                cookieStore.set("refreshTokenExpiresAt", rotatedToken?.expires, {
                    path: "/",
                    expires: new Date(rotatedToken?.expires),
                    httpOnly: true,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production"
                });
            }
        }
    }

    try {
        const res = await fetch(API_URL + "/auth/profile", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        return NextResponse.json({ user: data?.data, token }, { status: res.status });
    } catch {
        return NextResponse.json({ message: t("errors.somethingWentWrong") }, { status: 500 });
    }
}
