import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import SkillCard from "../cards/skill-card";
import { getTranslations } from "next-intl/server";
import { Skill } from "@/features/select-menu/types";
import { fetcher, FetcherOptions } from "@/utils/fetcher";

export async function getSkills(options?: FetcherOptions) {
    return await fetcher<Skill[]>("/api/public/skills", options);
}

export default async function PopularSkillsSection({ hide }: { hide?: boolean }) {
    const t = await getTranslations();
    const { data: skills } = await getSkills();

    return (
        <section className={hide ? "" : "py-20 lg:py-40"}>
            <div className="container flex flex-col gap-8">
                {!hide && (
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-3xl lg:text-4xl text-foreground-main font-semibold">
                            {t("common.popularSkills")}
                        </h2>
                        <Link
                            href="/skills"
                            className="flex items-center gap-2 transition-colors duration-200 hover:text-primary-main group"
                        >
                            {t("common.viewAll")}
                            <FiArrowLeft className="ltr:rotate-180" />
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {skills?.map((skill, idx) => {
                        return <SkillCard key={idx} skill={skill} />;
                    })}
                </div>
            </div>
        </section>
    );
}
