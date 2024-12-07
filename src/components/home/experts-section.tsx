import ExpertCard from "@/components/cards/expert-card";
import Button from "../ui/button";
import Link from "next/link";

export default function ExpertsSection() {
    const experts = Array(12).fill(null);

    return (
        <section className="container py-20 lg:py-40 flex flex-col gap-20">
            <div className="flex flex-col gap-6 text-center items-center max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold">تعرف على أفضل خبرائنا</h2>
                <p className="text-dark-300 text-lg lg:text-xl">
                    اكتشف مجموعة من المحترفين من الطراز العالمي الذين يعيدون تعريف الطريقة التي يتم
                    بها مشاركة المهارات. سواء كنت قد بدأت للتو أو تتطلع إلى الارتقاء بمستواك، فإن
                    خبراءنا موجودون لإرشادك
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
                {experts.map((_, idx) => {
                    return <ExpertCard key={idx} />;
                })}
            </div>
            <Link href="/experts" className="w-max mx-auto">
                <Button>أستكشف المزيد</Button>
            </Link>
        </section>
    );
}
