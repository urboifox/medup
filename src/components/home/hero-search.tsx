"use client";
import Button from "../ui/button";
import Input from "../ui/input";
import { useTranslations } from "next-intl";
import { LuMapPin } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import Form from "next/form";

export default function HeroSearch() {
    const t = useTranslations();

    return (
        <article className="p-3 bg-white rounded-lg shadow-md flex lg:items-center gap-3 justify-between max-w-3xl flex-col lg:flex-row">
            <Form
                className="flex lg:items-center gap-3 flex-col lg:flex-row w-full"
                action="/experts"
            >
                <Input
                    name="handle"
                    containerClassName="w-full"
                    className="border-none w-full"
                    placeholder={t("home.hero.searchPlaceholder")}
                    placeholderIcon={
                        <span className="text-primary-main">
                            <CiSearch size={24} />
                        </span>
                    }
                />
                <span className="h-6 w-px bg-dark-100 hidden lg:block" />
                <Input
                    name="city"
                    className="border-none lg:max-w-52 w-full"
                    placeholder={t("experts.locationSearchPlaceholder")}
                    placeholderIcon={
                        <span className="text-primary-main">
                            <LuMapPin size={24} strokeWidth={0.9} />
                        </span>
                    }
                />
                <Button type="submit">{t("common.search")}</Button>
            </Form>
        </article>
    );
}
