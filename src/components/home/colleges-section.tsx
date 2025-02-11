import { useTranslations } from "next-intl";
import { Suspense } from "react";
import CollegesSectionGrid from "./colleges-section-grid";

export default function CollegesSection() {
    const t = useTranslations();

    return (
        <section className="py-20">
            <div className="flex flex-col gap-20 container">
                <div className="flex flex-col gap-8 max-w-3xl flex-1">
                    <h2 className="text-4xl font-semibold foreground-200">
                        {t("home.categories.title")}
                    </h2>
                    <p className="text-foreground-50 font-medium">
                        {t("home.categories.description")}
                    </p>
                </div>

                <Suspense>
                    <CollegesSectionGrid />
                </Suspense>
            </div>
        </section>
    );
}
