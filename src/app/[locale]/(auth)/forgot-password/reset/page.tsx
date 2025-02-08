import FormContainer from "@/features/auth/components/form-container";
import ResetPasswordForm from "@/features/auth/components/reset-password-form";
import { useTranslations } from "next-intl";

export default function ResetPage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-4xl font-semibold">{t("auth.resetPassword")}</h1>
            <ResetPasswordForm />
        </FormContainer>
    );
}
