import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="pt-40 bg-[#18191c] text-white">
            <div className="container flex flex-wrap gap-10 pb-20 pt-10 justify-between">
                <div className="flex flex-col gap-4">
                    <Link href="/">
                        <h3 className="text-dark-100 font-bold text-xl">MedUp</h3>
                    </Link>
                    <p className="text-dark-300">
                        {t("callNow")}:{" "}
                        <Link href={`tel:${9661234}`} className="font-semibold text-dark-100">
                            +966 123456789
                        </Link>
                    </p>
                    <p className="text-dark-300 max-w-sm">{t("address")}</p>
                </div>
                <div className="flex flex-wrap gap-10">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-dark-100 font-medium text-xl">{t("quickLinks")}</h3>
                        <div className="flex flex-col gap-1">
                            <FooterLink href="/" label={t("aboutUs")} />
                            <FooterLink href="/" label={t("services")} />
                            <FooterLink href="/" label={t("contactUs")} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-dark-100 font-medium text-xl">{t("content")}</h3>
                        <div className="flex flex-col gap-1">
                            <FooterLink href="/" label={t("exploreDoctors")} />
                            <FooterLink href="/" label={t("exploreBooks")} />
                            <FooterLink href="/" label={t("exploreArticles")} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-dark-100 font-medium text-xl">{t("support")}</h3>
                        <div className="flex flex-col gap-1">
                            <FooterLink href="/" label={t("faq")} />
                            <FooterLink href="/" label={t("privacyPolicy")} />
                            <FooterLink href="/" label={t("termsAndConditions")} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 border-t border-dark-300">
                <div className="container flex items-center justify-between flex-col gap-4 lg:flex-row">
                    <p className="text-dark-200" dir="ltr">
                        {t("copyright")}
                    </p>
                    <div className="flex items-center gap-3 text-xl">
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            className="text-dark-300 transition-colors duration-200 hover:text-dark-100 active:text-dark-200"
                        >
                            <FaFacebookF />
                        </Link>
                        <Link
                            href="https://x.com"
                            target="_blank"
                            className="text-dark-300 transition-colors duration-200 hover:text-dark-100 active:text-dark-200"
                        >
                            <FaXTwitter />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="relative group text-dark-300 hover:text-dark-100 active:text-dark-200"
        >
            <FiArrowLeft className="ltr:rotate-180 opacity-0 transition-all duration-200 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 -start-6 group-hover:-start-2" />
            <p className="transition-all duration-200 group-hover:-translate-x-4 ltr:group-hover:translate-x-4">
                {label}
            </p>
        </Link>
    );
}
