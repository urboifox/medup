import { useTranslations } from "next-intl";
import { ExpertExperience } from "../types";
import ExpertExperienceItem from "./expert-experience-item";
import { Link } from "@/i18n/routing";
import { MdEdit } from "react-icons/md";

export default function ExpertProfileExperience({
    experience = [],
    editUrl
}: {
    experience: ExpertExperience[];
    editUrl?: string;
}) {
    const t = useTranslations();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center gap-2">
                <h2 className="text-3xl font-medium">{t("labels.experience")}</h2>
                {editUrl && (
                    <Link
                        href={"/profile/experience/add"}
                        className="text-dark-300 transition-colors duration-200 hover:text-dark-400"
                    >
                        <MdEdit size={20} />
                    </Link>
                )}
            </div>
            <div className="flex flex-col gap-4">
                {experience.length === 0 && (
                    <p className="text-dark-300">{t("experts.noExperience")}</p>
                )}
                {experience?.map((xp) => {
                    return <ExpertExperienceItem key={xp.id} experience={xp} />;
                })}
            </div>
        </div>
    );
}
