import LoginForm from "@/features/auth/components/login-form";
import { useTranslations } from "next-intl";

export default function LoginPage() {
    const t = useTranslations();

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="rounded-3xl border border-dark-200 py-20 flex flex-col gap-10 items-center w-full max-w-3xl">
                <h1 className="text-xl sm:text-4xl font-semibold">
                    {t("auth.loginToYourAccount")}
                </h1>
                <div className="px-4 sm:px-20 lg:px-32 w-full">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
