import { useTranslations } from "next-intl";
import { ExpertExperience } from "../types";

export default function ExpertExperienceItem({ experience }: { experience: ExpertExperience }) {
    const t = useTranslations();

    const workTypeOptions = [
        { value: 0, label: t("common.fullTime") },
        { value: 1, label: t("common.partTime") },
        { value: 2, label: t("common.remotely") }
    ] as const;

    return (
        <article className="flex gap-6">
            <div className="flex flex-col gap-4 items-center">
                <span className="w-2 h-2 rounded-full bg-primary-main"></span>
                <span className="w-[2px] flex-1 h-full bg-black/5"></span>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h3 className="text-dark-400 font-medium">
                        {experience.job_title} · {experience.hospital_name}
                    </h3>
                    <p className="text-xs text-dark-300">
                        {experience.start_date} - {experience.end_date} · {experience.city.name},{" "}
                        {experience.city?.country?.name}
                        {experience.work_type in workTypeOptions &&
                            `(${workTypeOptions[experience.work_type]?.label})`}
                    </p>
                </div>
                <p className="text-dark-400 text-sm max-w-lg">{experience.content}</p>
            </div>
        </article>
    );
}
