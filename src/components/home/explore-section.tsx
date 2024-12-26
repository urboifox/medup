import Image from "next/image";
import Button from "../ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ExploreSection() {
    const t = useTranslations();

    return (
        <section className="py-20 lg:py-40">
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
                    <h3 className="text-4xl font-semibold">{t("home.explore.title")}</h3>
                    <p className="text-dark-300">{t("home.explore.description")}</p>
                    <Link href="/experts" className="w-max">
                        <Button>{t("common.discoverMore")}</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
