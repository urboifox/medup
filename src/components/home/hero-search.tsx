import Image from "next/image";
import Button from "../ui/button";
import Input from "../ui/input";
import icons from "@/lib/icons";
import { useTranslations } from "next-intl";

export default function HeroSearch() {
    const t = useTranslations();

    return (
        <article className="p-3 bg-white rounded-lg shadow-md flex lg:items-center gap-3 justify-between max-w-2xl flex-col lg:flex-row">
            <div className="flex lg:items-center gap-3 flex-col lg:flex-row w-full">
                <Input
                    containerClassName="w-full"
                    className="border-transparent w-full"
                    placeholder={t("home.hero.searchPlaceholder")}
                    placeholderIcon={
                        <Image width={24} height={24} src={icons.search} alt="Search" />
                    }
                />
                {/* <span className="h-6 w-px bg-dark-100 hidden lg:block" /> */}
                {/* <Input */}
                {/*     className="border-transparent lg:max-w-52 w-full" */}
                {/*     placeholder="عنوانك" */}
                {/*     placeholderIcon={ */}
                {/*         <Image width={24} height={24} src={icons.mapPin} alt="Map Pin" /> */}
                {/*     } */}
                {/* /> */}
            </div>
            <Button>{t("common.search")}</Button>
        </article>
    );
}
