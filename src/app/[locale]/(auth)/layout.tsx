import LanguageSwitcher from "@/components/layout/language-switcher";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="bg-white shadow-[11px_4px_15px_0_#0000001A]">
                <header className="container py-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">MedUp</h1>
                    <LanguageSwitcher />
                </header>
            </div>
            <main>{children}</main>
        </>
    );
}
