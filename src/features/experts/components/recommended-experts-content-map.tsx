import ExpertCard from "@/components/cards/expert-card";
import { getAllExperts } from "../services";
import { getTranslations } from "next-intl/server";

export default async function RecommendedExpertsContentMap() {
    const t = await getTranslations();
    const res = await getAllExperts({
        params: { only_top: "1" }
    });
    const experts = res.data;


    return (
        <>
            {experts?.map((expert) => {
                return <ExpertCard key={expert.id} expert={expert} />;
            })}
            {experts?.length === 0 && (
                <p className="text-dark-300">{t("experts.noExperts")}</p>
            )}
        </>
    );
}
