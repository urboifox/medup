import images from "@/lib/images";
import Image from "next/image";
import Button from "../ui/button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";

export default function ActionsSection() {
    return (
        <section className="py-20">
            <div className="flex items-stretch gap-10 container flex-col lg:flex-row">
                <article className="flex-1 p-12 rounded-lg overflow-hidden w-full relative flex flex-col gap-8 justify-center">
                    <Image
                        fill
                        src={images.typingOnKeyboard}
                        alt="Typing on Keyboard"
                        draggable={false}
                        className="object-cover -z-20 object-right"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-l from-transparent to-black/30" />
                    <div className="flex flex-col gap-4">
                        <h3 className="text-foreground-main text-3xl font-semibold">وظف وكالة</h3>
                        <p className="text-foreground-100 text-sm max-w-sm">
                            تواصل مباشرة مع متخصصي الصناعة للحصول على رؤى شخصية وإرشادات عملية. اطرح
                            الأسئلة، ووضح المفاهيم، وعزز مهاراتك من خلال الدعم المخصص من خبراء ذوي
                            خبرة في مجالك.
                        </p>
                    </div>
                    <Link href="/" className="w-max">
                        <Button>
                            استكشف الآن
                            <FiArrowLeft />
                        </Button>
                    </Link>
                </article>
                <article className="relative flex-1 p-12 rounded-lg overflow-hidden bg-info-main w-full flex gap-4 items-center">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-3xl font-semibold text-white">اسأل خبير</h3>
                            <p className="text-sm max-w-sm text-light-200">
                                يمكنك التعاون مع الوكالات المتخصصة للوصول إلى مجموعة كبيرة من
                                الموارد والخبرات. سواء كنت بحاجة إلى برامج تدريبية شاملة أو مساعدة
                                في مشروع، فإن وكالاتنا مجهزة لمساعدتك على تحقيق أهدافك بكفاءة
                                وفعالية.
                            </p>
                        </div>
                        <Link href="/" className="w-max">
                            <Button variant="secondary">
                                استأجر الآن
                                <FiArrowLeft />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex-1 h-full">
                        <Image
                            src={images.doctor}
                            alt="Doctor"
                            fill
                            className="object-contain -translate-x-32 max-sm:hidden"
                        />
                    </div>
                </article>
            </div>
        </section>
    );
}
