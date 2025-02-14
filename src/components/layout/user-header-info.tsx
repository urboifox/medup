"use client";
import { Link } from "@/i18n/routing";
import Button from "../ui/button";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/features/auth/store";
import UserInfo from "@/features/auth/components/user-info";

export default function UserHeaderInfo() {
    const t = useTranslations();
    const user = useAuthStore((state) => state.user);

    return (
        <>
            {user ? (
                <UserInfo user={user} />
            ) : (
                <>
                    <Link
                        href={"/login"}
                        className="text-primary-main font-semibold hidden sm:block"
                    >
                        {t("auth.login")}
                    </Link>
                    <Link href="/register">
                        <Button className="text-sm sm:text-base max-sm:px-4">
                            {t("common.getStarted")}
                        </Button>
                    </Link>
                </>
            )}
        </>
    );
}
