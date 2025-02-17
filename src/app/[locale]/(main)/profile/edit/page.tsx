import BasicProfileForm from "@/features/auth/components/basic-profile-form";
import FormContainer from "@/features/auth/components/form-container";
import ExpertBasicProfileForm from "@/features/experts/components/expert-basic-profile-form";
import { getBasicProfile } from "@/features/experts/services";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function EditProfilePage() {
    const t = await getTranslations();
    const { data: expert } = await getBasicProfile();

    if (!expert) {
        return redirect("/logout");
    }

    return (
        <FormContainer>
            <h1 className="text-3xl font-semibold">{t("common.editYourProfile")}</h1>
            <h2 className="text-2xl font-semibold text-start w-full">{t("common.userProfile")}</h2>
            <BasicProfileForm user={expert.user} />
            <span className="bg-light-300 h-1 w-full my-4" />
            <h2 className="text-2xl font-semibold text-start w-full">{t("common.expertProfile")}</h2>
            <ExpertBasicProfileForm expert={expert} />
        </FormContainer>
    );
}
