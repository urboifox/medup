import { Link } from "@/i18n/routing";
import Button from "../ui/button";
import NavSideMenu from "./nav-side-menu";

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    { label: "الخبراء", href: "/experts" },
    { label: "المكتبة", href: "/library" },
    { label: "المقالات", href: "/articles" },
    { label: "التعيين الرقمي", href: "/experts" }
];

export default function Header() {
    return (
        <header className="w-full h-24 shadow-[11px_4px_15px_0_#0000001A] max-lg:sticky top-0 bg-white z-20">
            <div className="container flex items-center justify-between h-full">
                <div className="gap-10 flex items-center">
                    <div className="flex items-center gap-4">
                        <NavSideMenu navItems={navItems} />
                        <Link href={"/"} className="flex items-center gap-2">
                            <span className="text-2xl font-semibold text-[#18191c]">MedUp</span>
                        </Link>
                    </div>
                    <nav className="hidden lg:block">
                        <ul className="flex gap-6 items-center capitalize text-sm text-dark-300">
                            {navItems.map((item, idx) => {
                                return (
                                    <li key={idx}>
                                        <Link
                                            href={item.href}
                                            className="transition-colors duration-100 hover:text-dark-400"
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
                    <div className="flex items-center gap-4">
                        <Link href={"/"} className="text-primary-main font-semibold">
                            دخول
                        </Link>
                        <Button>أبدأ الان</Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
