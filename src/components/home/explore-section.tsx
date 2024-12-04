import Image from "next/image";
import Button from "../ui/button";
import Link from "next/link";

export default function ExploreSection() {
    return (
        <section className="py-40">
            <div className="container flex gap-10 flex-col lg:flex-row lg:gap-40 items-center">
                <div className="flex-1 w-full aspect-[1.3] relative rounded-[50px] overflow-hidden">
                    <Image
                        fill
                        src="/images/explore.webp"
                        quality={100}
                        alt="Explore"
                        draggable={false}
                        className="object-cover -z-20 object-right"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-6">
                    <h3 className="text-4xl font-bold">
                        تدريب المتدربين على مستوى عالمي من خلال إرشادات الخبراء
                    </h3>
                    <p className="text-dark-300">
                        نحن نربط المتدربين بشبكة متنوعة من المحترفين ذوي الخبرة في مختلف التخصصات.
                        استفد من التوجيه الشخصي والرؤى لتعزيز مهاراتك وثقتك في المجال الطبي. انضم
                        إلينا لإطلاق العنان لإمكاناتك اليوم!
                    </p>
                    <Link href="/" className="w-max">
                        <Button>أستكشف الآن</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
