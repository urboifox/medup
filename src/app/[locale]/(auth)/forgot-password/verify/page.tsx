import FormContainer from "@/features/auth/components/form-container";
import VerifyEmailForm from "@/features/auth/components/verify-email-form";
import { useTranslations } from "next-intl";

export default function VerifyPage() {
    const t = useTranslations();
    return (
        <FormContainer>
            <h1 className="text-4xl font-semibold">{t("auth.verifyYourEmail")}</h1>
            <VerifyEmailForm />
        </FormContainer>
    );
}
