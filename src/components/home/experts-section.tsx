import ExpertCard from "@/components/cards/expert-card";
import Button from "../ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function ExpertsSection() {
    const t = await getTranslations();
    const experts = Array(16).fill(null);

    return (
        <section className="container py-20 lg:py-40 flex flex-col gap-20">
            <div className="flex flex-col gap-6 text-center items-center max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-semibold">{t("home.experts.title")}</h2>
                <p className="text-dark-300 text-lg lg:text-xl">{t("home.experts.description")}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
                {experts.map((_, idx) => {
                    return <ExpertCard key={idx} />;
                })}
            </div>
            <Link href="/experts" className="w-max mx-auto">
                <Button>{t("common.discoverMore")}</Button>
            </Link>
        </section>
    );
}
