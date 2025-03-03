import Button from "@/components/ui/button";
import LibraryCard from "@/features/library/components/book-card";
import { getLibrary, getLibraryItem } from "@/features/library/services";
import moment from "moment";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AiOutlineWarning } from "react-icons/ai";

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await getLibraryItem(id).catch(() => null);
    if (!res || !res.data) return notFound();
    const { data: book } = res;

    const locale = await getLocale();

    const { data: suggestedBooks } = await getLibrary({
        params: {
            // suggested_based_id: id,
            per_page: "4"
        }
    });

    const t = await getTranslations();

    return (
        <div className="container flex flex-col gap-8 py-14 xl:flex-row">
            <div className="flex flex-col gap-14 xl:w-2/3">
                <div className="flex gap-6 items-center flex-col lg:flex-row">
                    <Image
                        src={book.cover}
                        alt={book.title}
                        width={270}
                        height={455}
                        className="shadow-xl object-cover w-[270px] h-[455px] rounded-md"
                    />
                    <div className="flex flex-col gap-4 w-full">
                        <h3 className="font-semibold lg:text-2xl xl:text-4xl">{book.title}</h3>
                        <p className="text-sm">
                            {t("common.by")}: {book.expert.user.name}
                        </p>
                        <p className="text-primary-main font-semibold">${book.price}</p>

                        <Button className="w-fit">{t("common.buyNow")}</Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold xl:text-3xl">
                        {t("labels.description")}
                    </h2>
                    <p>{book.description}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold xl:text-3xl">
                        {t("common.information")}
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("common.price")}</p>
                            <p className="text-dark-300">${book.price}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("common.buys")}</p>
                            <p className="text-dark-300">{41}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("labels.datePublished")}</p>
                            <p className="text-dark-300">
                                {moment(book.created_at).locale(locale).format("LL")}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("labels.speciality")}</p>
                            <p className="text-dark-300">{book.speciality.name}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("labels.pagesCount")}</p>
                            <p className="text-dark-300">{book.pages_count}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("labels.author")}</p>
                            <p className="text-dark-300">{book.expert.user.name}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 items-start">
                    <AiOutlineWarning className="text-warning-main h-fit" size={64} />
                    <p>{t("common.libraryWarning")}</p>
                </div>
            </div>
            <div className="flex gap-4 flex-col xl:w-1/3">
                <h2 className="text-2xl font-semibold xl:text-3xl">{t("common.suggested")}</h2>
                <div className="flex gap-4 flex-col">
                    {suggestedBooks?.map((book) => (
                        <LibraryCard key={book.id} libraryItem={book} />
                    ))}
                </div>
            </div>
        </div>
    );
}
