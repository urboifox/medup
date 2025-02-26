import PageSearch from "@/components/layout/page-search";
import Button from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function CollaborateLayout({ children }: { children: React.ReactNode }) {
    const t = useTranslations();

    return (
        <div className="container flex flex-col gap-8 py-14">
            <div className="flex items-center gap-4 flex-col-reverse max-md:items-start md:flex-row">
                <PageSearch />
                <Link href="/collaborate/add">
                    <Button className="w-max">+ {t("collaborate.addProject")}</Button>
                </Link>
            </div>

            {children}
        </div>
    );
}
