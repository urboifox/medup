import { useTranslations } from "next-intl";
import { Expert } from "../types";
import ExpertExperienceItem from "./expert-experience-item";

export default function ExpertProfileExperience({ expert }: { expert: Expert }) {
    const t = useTranslations();

    return (
        <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-medium">{t("labels.experience")}</h2>
            <div className="flex flex-col gap-4">
                {expert.experiences.map((xp) => {
                    return <ExpertExperienceItem key={xp.id} experience={xp} />;
                })}
            </div>
        </div>
    );
}
