import FormContainer from "@/features/auth/components/form-container";
import ExpertExperienceProfileForm from "@/features/experts/components/expert-experience-profile-form";
import { getTranslations } from "next-intl/server";

export default async function ProfileAddExperiencePage() {
    const t = await getTranslations();

    return (
        <FormContainer>
            <h1 className="text-3xl font-semibold capitalize">{t("common.addExperience")}</h1>
            <ExpertExperienceProfileForm />
        </FormContainer>
    );
}
