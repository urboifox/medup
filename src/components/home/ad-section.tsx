import { useTranslations } from "next-intl";

export default function AdSection() {
    const t = useTranslations();

    return (
        <div className="py-20 lg:py-32">
            <section className="rounded-lg container bg-gray-100 h-80 flex items-center justify-center">
                {t("common.adHere")}
            </section>
        </div>
    );
}
