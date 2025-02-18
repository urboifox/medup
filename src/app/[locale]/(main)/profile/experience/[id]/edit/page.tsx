import FormContainer from "@/features/auth/components/form-container";
import ExpertEditExperienceProfileForm from "@/features/experts/components/expert-edit-experience-profile-form";
import { getProfileExperience } from "@/features/experts/services";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function ProfileExperiencePage({
    params
}: {
    params: Promise<Record<string, string | undefined>>;
}) {
    const paramsData = await params;
    const t = await getTranslations();

    const { data: experience } = await getProfileExperience(paramsData.id as string);

    if (!experience) {
        return redirect("/profile");
    }

    return (
        <FormContainer>
            <h1 className="text-3xl font-semibold capitalize">{t("common.editExperience")}</h1>
            <ExpertEditExperienceProfileForm experience={experience} />
        </FormContainer>
    );
}
