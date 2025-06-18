import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import SkillCard from "../cards/skill-card";
import { getTranslations } from "next-intl/server";
import { Skill } from "@/features/select-menu/types";
import { fetcher, FetcherOptions } from "@/utils/fetcher";
import Button from "../ui/button";

export async function getSkills(options?: FetcherOptions) {
    return await fetcher<Skill[]>("/api/public/skills", options);
}

export default async function PopularSkillsSection({
    hide,
    handle,
    specialities
}: {
    hide?: boolean;
    handle?: string;
    specialities?: string;
}) {
    const t = await getTranslations();
    const { data: skills } = await getSkills({ params: { handle: handle || "", specialities: specialities || "" } });

    return (
        <section className={hide ? "" : "py-20 lg:py-40"}>
            <div className="container flex flex-col gap-8">
                {!hide && (
                    <div className="flex sm:items-center justify-between max-sm:flex-col gap-4 flex-wrap">
                        <h2 className="text-3xl lg:text-4xl text-foreground-main font-semibold">
                            {t("common.popularSkills")}
                        </h2>
                        <div className="flex items-center gap-2 self-end">
                            <Link
                                href="/skills"
                                className="flex items-center gap-2 transition-colors duration-200 hover:text-primary-main group"
                            >
                                {t("common.viewAll")}
                                <FiArrowLeft className="ltr:rotate-180" />
                            </Link>
                            <Link href="/skills/add">
                                <Button className="w-max">+ {t("common.postSkill")}</Button>
                            </Link>
                        </div>
                    </div>
                )}

                {skills?.length === 0 && (
                    <p className="text-gray-500 italic py-4">{t("common.noDataFound")}</p>
                )}
                <div className="grid gap-4 lg:gap-10 grid-cols-2 lg:grid-cols-3">
                    {skills?.map((skill, idx) => {
                        return <SkillCard key={idx} skill={skill} />;
                    })}
                </div>
            </div>
        </section>
    );
}
