import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "../ui/button";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa6";

export default function DoubleCards() {
    const t = useTranslations("common");
    return (
        <div className="flex gap-6 flex-col lg:flex-row">
            <article className="flex flex-col gap-4 flex-1 rounded-lg shadow-md bg-white">
                <div className="aspect-video w-full relative max-h-52">
                    <Image
                        src="/images/double-1.png"
                        alt="double-1"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-medium text-2xl">{t("d1t")}</h2>
                        <p className="text-[#636A80] text-sm">{t("d1d")}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <FaEnvelope />
                            <a href="mailto:iuhtrn@gmail.com" className="text-primary-main">
                                iuhtrn@gmail.com
                            </a>
                        </div>
                    </div>
                    <a href="mailto:iuhtrn@gmail.com">
                        <Button>{t("partnerWithUs")}</Button>
                    </a>
                </div>
            </article>

            <article className="flex flex-col gap-4 flex-1 rounded-lg shadow-md bg-white">
                <div className="aspect-video w-full relative max-h-52">
                    <Image
                        src="/images/double-2.png"
                        alt="double-2"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-medium text-2xl">{t("d2t")}</h2>
                        <p className="text-[#636A80] text-sm">{t("d2d")}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <FaEnvelope />
                            <a href="mailto:iuhtrn@gmail.com" className="text-primary-main">
                                iuhtrn@gmail.com
                            </a>
                        </div>
                    </div>
                    <a href="mailto:iuhtrn@gmail.com">
                        <Button>{t("partnerWithUs")}</Button>
                    </a>
                </div>
            </article>
        </div>
    );
}
