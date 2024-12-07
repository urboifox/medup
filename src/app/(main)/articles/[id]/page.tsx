import ArticleCard from "@/components/cards/article-card";
import images from "@/lib/images";
import moment from "moment";
import Image from "next/image";
import { FiCalendar, FiUser } from "react-icons/fi";

export default function ArticlePage() {
    const tags = ["بحوثات", "المرضى", "التكنولوجيا"];
    const articles = Array(6).fill(null);

    return (
        <div className="container min-h-screen py-16 flex flex-col gap-20 items-center">
            <div className="flex flex-col gap-10 max-w-6xl">
                <div className="flex flex-col gap-6">
                    <h1 className="font-semibold text-2xl lg:text-4xl">
                        تأثير التكنولوجيا على التشخيص الطبي الحديث
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-primary-main">
                                <FiUser />
                            </span>
                            <p>محمد أشرف</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-primary-main">
                                <FiCalendar />
                            </span>
                            <time>{moment().locale("ar").format("YYYY/MM/DD")}</time>
                        </div>
                    </div>
                </div>
                <div className="relative aspect-video w-full">
                    <Image src={images.hero} alt="Doctor" fill />
                </div>
                <article
                    dangerouslySetInnerHTML={{
                        __html: "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها."
                    }}
                />
                <div className="flex items-center gap-4">
                    <p className="font-semibold">الشعارات:</p>
                    <div className="flex items-center gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-dark-400 border border-light-400 rounded-lg p-2 text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <h2 className="text-3xl font-bold">المحتوى المقترح</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((_, idx) => {
                        return <ArticleCard key={idx} />;
                    })}
                </div>
            </div>
        </div>
    );
}
