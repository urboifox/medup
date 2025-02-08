import FormContainer from "@/features/auth/components/form-container";
import LoginForm from "@/features/auth/components/login-form";
import { useTranslations } from "next-intl";

export default function LoginPage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-xl sm:text-4xl font-semibold">{t("auth.loginToYourAccount")}</h1>
            <LoginForm />
        </FormContainer>
    );
}
