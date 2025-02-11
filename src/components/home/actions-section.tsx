import images from "@/lib/images";
import Image from "next/image";
import Button from "../ui/button";
import { Link } from "@/i18n/routing";
import { FiArrowLeft } from "react-icons/fi";
import { useTranslations } from "next-intl";

export default function ActionsSection() {
    const t = useTranslations();

    return (
        <section className="py-20">
            <div className="flex items-stretch gap-10 container flex-col lg:flex-row">
                <article className="flex-1 p-12 rounded-lg overflow-hidden w-full relative flex flex-col gap-8 justify-center">
                    <Image
                        fill
                        src={images.typingOnKeyboard}
                        alt="Typing on Keyboard"
                        draggable={false}
                        className="object-cover -z-20 object-right ltr:scale-x-[-1]"
                    />
                    <div className="flex flex-col gap-4">
                        <h3 className="text-foreground-main text-3xl font-semibold">
                            {t("home.actions.agenciesHiring")}
                        </h3>
                        <div className="text-foreground-100 text-sm max-w-md">
                            <ul className="list-disc list-inside">
                                <li>{t("home.actions.agenciesHiringDescriptionOne")}</li>
                                <li>{t("home.actions.agenciesHiringDescriptionTwo")}</li>
                                <li>{t("home.actions.agenciesHiringDescriptionThree")}</li>
                                <li>{t("home.actions.agenciesHiringDescriptionFour")}</li>
                            </ul>
                        </div>
                    </div>
                    <Link href="/" className="w-max">
                        <Button>
                            {t("common.exploreNow")}
                            <FiArrowLeft className="ltr:rotate-180" />
                        </Button>
                    </Link>
                </article>
                <article className="relative flex-1 p-12 rounded-lg overflow-hidden bg-primary-main w-full flex gap-4 items-center">
                    <div className="flex flex-col gap-8 z-20">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-3xl font-semibold text-white">
                                {t("home.actions.digitalOnlineCourses")}
                            </h3>
                            <p className="text-sm max-w-sm text-light-200">
                                {t("home.actions.digitalOnlineCoursesDescription")}
                            </p>
                        </div>
                        <Link href="/experts" className="w-max">
                            <Button variant="secondary">
                                {t("common.exploreNow")}
                                <FiArrowLeft className="ltr:rotate-180" />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex-1 h-full select-none">
                        <Image
                            src={images.doctor}
                            alt="Doctor"
                            fill
                            className="object-contain ltr:scale-x-[-1] ltr:translate-x-32 -translate-x-32 max-sm:hidden"
                        />
                    </div>
                </article>
            </div>
        </section>
    );
}
