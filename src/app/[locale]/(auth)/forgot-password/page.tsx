import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";
import FormContainer from "@/features/auth/components/form-container";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-4xl font-semibold">{t("auth.forgotPassword")}</h1>
            <ForgotPasswordForm />
        </FormContainer>
    );
}
