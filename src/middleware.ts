import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const AUTH_ROUTES = ["/login"];
const PRIVATE_ROUTES = ["/experts"];

export const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.clone();
    const pathname = "/" + url.pathname.split("/").slice(2).join("/");

    if (token && AUTH_ROUTES.some((path) => pathname.startsWith(path))) {
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    if (!token && PRIVATE_ROUTES.some((path) => pathname.startsWith(path))) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/(ar|en)/:path*"]
};
