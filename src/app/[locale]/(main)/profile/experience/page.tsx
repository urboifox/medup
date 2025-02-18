import FormContainer from "@/features/auth/components/form-container";
import ExpertExperienceProfileForm from "@/features/experts/components/expert-experience-profile-form";
import { getExpertProfile } from "@/features/experts/services";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function ProfileExperiencePage() {
    const t = await getTranslations();

    const { data: expert } = await getExpertProfile();

    if (!expert) {
        return redirect("/logout");
    }

    return (
        <FormContainer>
            <h1 className="text-3xl font-semibold capitalize">{t("common.yourExperience")}</h1>
            <ExpertExperienceProfileForm expert={expert} />
        </FormContainer>
    );
}
