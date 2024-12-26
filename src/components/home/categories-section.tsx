import { useTranslations } from "next-intl";
import HomeCategoryCard from "../cards/home-category-card";

export default function CategoriesSection() {
    const t = useTranslations();

    return (
        <section className="py-20">
            <div className="flex flex-col gap-20 container">
                <div className="flex items-center gap-10 flex-col lg:flex-row">
                    <div className="flex flex-col gap-8 max-w-3xl flex-1">
                        <h2 className="text-4xl font-semibold foreground-200">
                            {t("home.categories.title")}
                        </h2>
                        <p className="text-foreground-50 font-medium">
                            {t("home.categories.description")}
                        </p>
                    </div>
                    <HomeCategoryCard />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-10">
                    <HomeCategoryCard />
                    <HomeCategoryCard />
                    <HomeCategoryCard />
                    <HomeCategoryCard />
                </div>
            </div>
        </section>
    );
}
