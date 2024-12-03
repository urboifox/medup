import images from "@/lib/images";
import Image from "next/image";
import HeroSearch from "./hero-search";

export default function HeroSection() {
    return (
        <section className="relative">
            <Image src={images.hero} alt="Hero Background" fill className="object-cover -z-20 scale-x-[-1]" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent to-black/60" />
            <div className="container flex flex-col gap-8 justify-center h-full min-h-[calc(100vh-96px)]">
                <div className="flex flex-col gap-6 max-w-4xl">
                    <h1 className="text-white font-semibold text-3xl lg:text-5xl leading-snug lg:leading-[58px]">
                        انسَ القواعد القديمة. يمكنك تعلُّم المهارات من أفضل الخبراء. الآن. هنا.
                    </h1>
                    <p className="text-white text-lg max-w-[80%]">
                        ابحث عن فرص لكل مرحلة من مراحل حياتك المهنية، وتحكم في متى وأين وكيف تعمل،
                        واستكشف طرقًا مختلفة لكسب المال.
                    </p>
                </div>
                <HeroSearch />
            </div>
        </section>
    );
}
