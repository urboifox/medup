import { useTranslations } from "next-intl";
import { Suspense } from "react";
import CollegesSectionGrid from "./colleges-section-grid";

export default function CollegesSection() {
    const t = useTranslations();

    return (
        <section className="py-10">
            <div className="flex flex-col sm:gap-20 container items-center">
                <div className="flex flex-col gap-8 max-w-3xl flex-1 text-center">
                    <h2 className="text-4xl font-semibold foreground-200">
                        {t("home.colleges.title")}
                    </h2>
                    <p className="text-foreground-50 font-medium">
                        {t("home.colleges.description")}
                    </p>
                </div>

                <Suspense>
                    <CollegesSectionGrid />
                </Suspense>
            </div>
        </section>
    );
}
