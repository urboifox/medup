import { useTranslations } from "next-intl";
import Button from "../ui/button";
import { Link } from "@/i18n/routing";
import icons from "@/lib/icons";
import Image from "next/image";

export default function SpecializedSkillsSection() {
    const t = useTranslations();

    return (
        <section className="container flex flex-col gap-20 py-20">
            <div className="flex items-center gap-10 flex-col-reverse lg:flex-row w-full justify-between">
                <div className="flex flex-col gap-10 max-w-3xl">
                    <h3 className="font-semibold text-3xl md:text-5xl">
                        10000+ {t("home.specialized.specializedSkills")}
                    </h3>
                    <p className="text-foreground-100">{t("home.specialized.description")}</p>
                    <Link href="/experts">
                        <Button>{t("common.exploreNow")}</Button>
                    </Link>
                </div>

                <Image
                    src={icons.specializedSection}
                    alt="Specialized Skills Section"
                    className="object-cover"
                    quality={100}
                    width={304}
                    height={293}
                />
            </div>
        </section>
    );
}
