import FormContainer from "@/features/auth/components/form-container";
import RegisterLayoutTabs from "@/features/auth/components/register-layout-tabs";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function RegisterFormLayout({ children }: { children: React.ReactNode }) {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-4xl font-semibold">{t("auth.preRegisterTitle")}</h1>
            <RegisterLayoutTabs />
            {children}
            <p className="text-sm">
                {t("auth.alreadyHaveAnAccount")}{" "}
                <Link href="/login" className="text-primary-main font-semibold underline">
                    {t("auth.login")}
                </Link>
            </p>
        </FormContainer>
    );
}
