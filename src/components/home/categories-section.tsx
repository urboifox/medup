import HomeCategoryCard from "../cards/home-category-card";

export default function CategoriesSection() {
    return (
        <section className="py-20">
            <div className="flex flex-col gap-20 container">
                <div className="flex items-center gap-10 flex-col lg:flex-row">
                    <div className="flex flex-col gap-8 max-w-3xl flex-1">
                        <h2 className="text-4xl font-semibold foreground-200">
                            اكتشف مسارك في الطب
                        </h2>
                        <p className="text-foreground-50 font-semibold">
                            انغمس في مجموعة متنوعة من فرص التعلم المصممة خصيصًا للمهنيين الطبيين
                            الطموحين. تصفح الفئات التي قمنا بتنظيمها بخبرة للعثور على الدورات
                            والموارد المصممة لتعميق فهمك للمجال الطبي وربطك بخبراء الصناعة. أطلق
                            العنان لإمكاناتك اليوم!
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
