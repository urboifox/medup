import Button from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import images from "@/lib/images";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HiOutlineUpload } from "react-icons/hi";

export default function ArticlesUploadSection() {
    const t = useTranslations();

    return (
        <div className="flex items-center gap-10 justify-between flex-col-reverse lg:flex-row py-20">
            <div className="flex flex-col gap-6">
                <h2 className="text-5xl font-bold text-dark-400">{t("articles.uploadTitle")}</h2>
                <p className="text-dark-300 max-w-2xl font-medium">
                    {t("articles.uploadDescription")}
                </p>
                <Link href="/researches/add">
                    <Button>
                        <HiOutlineUpload size={20} />
                        {t("articles.uploadButton")}
                    </Button>
                </Link>
            </div>

            <Image
                src={images.addArticle}
                alt="Add research"
                width={450}
                height={300}
                className="object-cover rounded-2xl max-lg:w-full"
            />
        </div>
    );
}
