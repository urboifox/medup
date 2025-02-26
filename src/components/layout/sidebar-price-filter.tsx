"use client";

import useQueryString from "@/hooks/useQueryString";
import Radio from "../ui/radio";
import { useTranslations } from "next-intl";

export default function SidebarPriceFilter() {
    const t = useTranslations();
    const { createQueryString, getQueryString } = useQueryString();
    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        createQueryString("paid", e.currentTarget.value);
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="font-semibold text-2xl">{t("common.price")}</h2>
            <div className="flex flex-col gap-4 text-dark-300">
                <Radio
                    label={t("common.paidVolunteer")}
                    value="1"
                    name="paid"
                    onChange={handleChange}
                    defaultChecked={getQueryString("paid") === "1" ? true : true}
                />
                <Radio
                    label={t("common.unpaidVolunteer")}
                    value="0"
                    name="paid"
                    onChange={handleChange}
                    defaultChecked={getQueryString("paid") === "0"}
                />
            </div>
        </div>
    );
}
