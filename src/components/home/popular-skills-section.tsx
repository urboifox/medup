import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import SkillCard from "../cards/skill-card";

export default function PopularSkillsSection() {
    const skills = Array(9).fill(null);

    return (
        <section className="py-20 lg:py-40">
            <div className="container flex flex-col gap-8">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-3xl lg:text-4xl text-foreground-main font-semibold">
                        المهارات الشائعة
                    </h2>
                    <Link
                        href="/"
                        className="flex items-center gap-2 transition-colors duration-200 hover:text-primary-main group"
                    >
                        جميع المهارات
                        <FiArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((_, idx) => {
                        return <SkillCard key={idx} />;
                    })}
                </div>
            </div>
        </section>
    );
}
