import FormContainer from "@/features/auth/components/form-container";
import LoginForm from "@/features/auth/components/login-form";
import { useTranslations } from "next-intl";

export default function LoginPage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-xl sm:text-4xl font-semibold">{t("auth.loginToYourAccount")}</h1>
            <div className="px-4 sm:px-20 lg:px-32 w-full">
                <LoginForm />
            </div>
        </FormContainer>
    );
}
