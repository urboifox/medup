import FormContainer from "@/features/auth/components/form-container";
import VerifyForm from "@/features/auth/components/verify-form";
import { useTranslations } from "next-intl";

export default function VerifyPage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-4xl font-semibold">{t("auth.verifyYourAccount")}</h1>
            <VerifyForm />
        </FormContainer>
    );
}
