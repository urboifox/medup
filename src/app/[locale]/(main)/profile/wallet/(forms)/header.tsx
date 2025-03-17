"use client";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import { BiTransfer } from "react-icons/bi";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";

export default function WalletFormsHeader() {
    const t = useTranslations();
    const pathname = usePathname();

    const links = [
        {
            title: t("common.withdraw"),
            href: "/profile/wallet/withdraw",
            icon: <GoArrowDownLeft size={24} />
        },
        {
            title: t("common.deposit"),
            href: "/profile/wallet/deposit",
            icon: <GoArrowUpRight size={24} />
        },
        {
            title: t("common.transfer"),
            href: "/profile/wallet/transfer",
            icon: <BiTransfer size={24} />
        }
    ];

    return (
        <div className="flex items-center justify-center gap-4 lg:gap-8 flex-wrap">
            {links.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={i}
                        className={cn(
                            "text-lg font-semibold p-4 flex items-center gap-2",
                            isActive && "text-primary-main border-b-2 border-b-primary-main"
                        )}
                        href={link.href}
                    >
                        {link.icon}
                        {link.title}
                    </Link>
                );
            })}
        </div>
    );
}
