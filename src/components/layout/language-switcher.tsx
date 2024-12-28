"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import DropdownButton from "../ui/dropdown-button";
import { CiGlobe } from "react-icons/ci";

export default function LanguageSwitcher() {
    return (
        <DropdownButton menu={<LanguageDropdownMenu />}>
            <CiGlobe size={24} />
        </DropdownButton>
    );
}

function LanguageDropdownMenu() {
    const router = useRouter();
    const pathname = usePathname();

    function handleLanguageChange(lang: string) {
        router.replace(pathname, {
            locale: lang
        });
    }

    return (
        <ul className="p-4 rounded-lg bg-white shadow-lg flex flex-col gap-2">
            <li>
                <button
                    onClick={() => handleLanguageChange("en")}
                    className="font-medium px-8 py-2 rounded-md hover:bg-primary-main hover:text-white w-full"
                >
                    English
                </button>
            </li>
            <li>
                <button
                    onClick={() => handleLanguageChange("ar")}
                    className="font-medium px-8 py-2 rounded-md hover:bg-primary-main hover:text-white w-full font-tajawal"
                >
                    عربي
                </button>
            </li>
        </ul>
    );
}
