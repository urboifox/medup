import images from "@/lib/images";
import Image from "next/image";
import HeroSearch from "./hero-search";

export default function HeroSection() {
    return (
        <section className="relative">
            <Image src={images.hero} alt="Hero Background" fill className="object-cover -z-20" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-l from-transparent to-black/60" />
            <div className="container flex flex-col gap-8 justify-center h-full min-h-[calc(100vh-96px)]">
                <div className="flex flex-col gap-6 max-w-4xl">
                    <h1 className="text-white font-semibold text-3xl lg:text-5xl leading-snug lg:leading-[58px]">
                        Forget the old rules. You can learn skills form the best experts. Right now.
                        Right here.
                    </h1>
                    <p className="text-white text-lg max-w-[80%]">
                        Find opportunities for every stage of your career Control when, where, and
                        how you work and ,Explore different ways to earn
                    </p>
                </div>
                <HeroSearch />
            </div>
        </section>
    );
}
