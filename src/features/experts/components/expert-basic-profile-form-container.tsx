import { getTranslations } from "next-intl/server";
import ExpertBasicProfileForm from "./expert-basic-profile-form";
import { getExpertProfile } from "../services";

export default async function ExpertBasicProfileFormContainer() {
    const t = await getTranslations();
    const { data: expert } = await getExpertProfile();

    if (!expert) {
        return null;
    }

    return (
        <>
            <h2 className="text-2xl font-semibold text-start w-full">
                {t("common.expertProfile")}
            </h2>
            <ExpertBasicProfileForm expert={expert} />
        </>
    );
}
