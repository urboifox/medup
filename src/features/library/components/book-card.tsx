import Image from "next/image";
import { Link } from "@/i18n/routing";
import { LibraryItem } from "../types";
import { useTranslations } from "next-intl";

export default function LibraryCard({ libraryItem }: { libraryItem: LibraryItem }) {
    const t = useTranslations();

    return (
        <Link href={"/library/" + libraryItem.id} className="w-full">
            <article className="flex gap-4 items-center group w-full">
                <Image
                    src={libraryItem.cover}
                    alt={libraryItem.title}
                    width={150}
                    height={230}
                    className="shadow-xl object-cover w-[150px] h-[230px] rounded-md"
                />
                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold lg:text-lg group-hover:underline">
                        {libraryItem.title}
                    </h3>
                    <p className="text-sm">
                        {t("common.by")}: {libraryItem.expert.user.name}
                    </p>
                    <p className="line-clamp-3 text-dark-300 text-sm">{libraryItem.description}</p>
                    <p className="text-primary-main font-semibold">${libraryItem.price}</p>
                </div>
            </article>
        </Link>
    );
}
