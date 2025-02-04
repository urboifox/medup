import { useTranslations } from "next-intl";

export default function NoResults() {
    const t = useTranslations();
    return <p className="text-2xl text-gray-500">{t("common.noResults")}</p>;
}
