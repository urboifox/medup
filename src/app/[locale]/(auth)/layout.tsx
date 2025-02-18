import LanguageSwitcher from "@/components/layout/language-switcher";
import Logo from "@/components/ui/logo";
import { Link } from "@/i18n/routing";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="bg-white shadow-[11px_4px_15px_0_#0000001A]">
                <header className="container py-6 flex items-center justify-between">
                    <Link href={"/"} className="flex items-center gap-2">
                        <Logo />
                    </Link>
                    <LanguageSwitcher />
                </header>
            </div>
            <main>{children}</main>
        </>
    );
}
