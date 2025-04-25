import Button from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { AiOutlineWarning } from "react-icons/ai";

export default function ContractPage() {
    const t = useTranslations();

    return (
        <div className="flex gap-4 py-10 container">
            <div className="flex-1 flex flex-col gap-8">
                {/* embed the pdf viewer here */}
                <embed
                    src="/contract.pdf#toolbar=0"
                    width="100%"
                    height="100%"
                    className="min-h-[800px]"
                />
                <a download href="/contract.pdf" className="w-full">
                    <Button className="w-full">{t("common.createMyContract")}</Button>
                </a>
            </div>
            <div className="flex flex-col gap-2 ps-4 [&_a]:text-primary-main [&_a]:font-semibold text-dark-300 text-sm max-w-80">
                <AiOutlineWarning className="text-warning-main h-fit" size={20} />
                <p>
                    For the safety and security of our" members, all buying and selling must take
                    place on the <Link href="/">Medupskills.com</Link> platform. Any transactions
                    outside of the platform are against our terms of service and may lead to account
                    restrictions The platform reserves the right to take legal action against any
                    violators
                </p>
                <p>
                    لحماية جميع الأعضاء، يقتصر التعامل التجاري على منصة{" "}
                    <Link href="/">Medupskills.com</Link> فقط. أي تعامل خارج المنصة بعد مخالفة
                    الشروط الاستخدام ويعرض الحساب للحجب
                </p>
            </div>
        </div>
    );
}
