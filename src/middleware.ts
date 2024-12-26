import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

export const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    return intlMiddleware(req);
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/(ar|en)/:path*"]
};
