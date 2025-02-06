"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

export default function RegisterLayoutTabs() {
    const t = useTranslations();
    const pathname = usePathname();

    const tabs = [
        { name: t("common.student"), href: "/register/student" },
        { name: t("common.trainee"), href: "/register/trainee" },
        { name: t("common.expert"), href: "/register/expert" },
        { name: t("common.researcher"), href: "/register/researcher" }
    ];

    return (
        <div className="flex items-center gap-4 flex-wrap justify-center w-full">
            {tabs.map((tab, i) => {
                return (
                    <Link
                        key={i}
                        href={tab.href}
                        className={cn(
                            "p-1",
                            pathname === tab.href
                                ? "text-primary-main font-semibold border-b-2 border-primary-main"
                                : "text-dark-300"
                        )}
                    >
                        {tab.name}
                    </Link>
                );
            })}
        </div>
    );
}
