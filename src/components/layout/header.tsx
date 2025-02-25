import { Link } from "@/i18n/routing";
import NavSideMenu from "./nav-side-menu";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";
import UserHeaderInfo from "./user-header-info";
import Logo from "../ui/logo";

type NavItem = {
    label: string;
    href: string;
};

export default function Header() {
    const t = useTranslations();

    const navItems: NavItem[] = [
        { label: t("nav.experts"), href: "/experts" },
        { label: t("nav.library"), href: "/library" },
        { label: t("nav.researches"), href: "/researches" },
        { label: t("nav.ideas"), href: "/ideas" },
        { label: t("nav.collaborate"), href: "/collaborate" },
        { label: t("nav.digitalAppointment"), href: "/experts" }
    ];

    return (
        <header className="w-full h-24 shadow-[11px_4px_15px_0_#0000001A] max-lg:sticky top-0 bg-white z-20">
            <div className="container flex items-center justify-between h-full gap-2">
                <div className="gap-10 flex items-center">
                    <div className="flex items-center gap-4">
                        <NavSideMenu navItems={navItems} />
                        <Link href={"/"} className="flex items-center gap-2">
                            <Logo />
                        </Link>
                    </div>
                    <nav className="hidden lg:block">
                        <ul className="flex gap-6 items-center capitalize text-sm text-dark-300">
                            {navItems.map((item, idx) => {
                                return (
                                    <li key={idx}>
                                        <Link
                                            href={item.href}
                                            className="transition-colors duration-100 hover:text-dark-400 font-medium"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
                <div className="gap-10 flex items-center">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <LanguageSwitcher />
                        <UserHeaderInfo />
                    </div>
                </div>
            </div>
        </header>
    );
}
