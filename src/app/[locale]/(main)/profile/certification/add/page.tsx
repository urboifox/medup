import FormContainer from "@/features/auth/components/form-container";
import ExpertCertificateProfileForm from "@/features/experts/components/expert-certificate-profile-form";
import { getTranslations } from "next-intl/server";

export default async function ProfileAddCertificatePage() {
    const t = await getTranslations();

    return (
        <FormContainer>
            <h1 className="text-3xl font-semibold capitalize">{t("common.addCertificate")}</h1>
            <ExpertCertificateProfileForm />
        </FormContainer>
    );
}
