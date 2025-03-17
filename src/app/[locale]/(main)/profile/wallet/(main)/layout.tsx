import Button from "@/components/ui/button";
import { getBalance } from "@/features/wallet/services";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { AiOutlineBank } from "react-icons/ai";

export default async function TransactionsLayout({ children }: { children: React.ReactNode }) {
    const t = await getTranslations();
    const { data: balance } = await getBalance({
        next: {
            tags: ["wallet"]
        }
    });

    return (
        <div className="container flex flex-col gap-8 py-14">
            <h1 className="text-2xl font-semibold">{t("common.walletMangement")}</h1>
            <div className="bg-light-200 p-6 rounded-xl flex flex-col gap-2 items-center">
                <p className="text-lg text-dark-300">{t("common.availableBalance")}</p>
                <p className="font-semibold text-3xl text-primary-main">${balance?.balance || 0}</p>
            </div>
            <div className="flex items-center justify-center gap-4">
                <Link href="/profile/wallet/withdraw">
                    <Button>
                        <AiOutlineBank size={20} />
                        {t("common.withdraw")}
                    </Button>
                </Link>
            </div>
            {children}
        </div>
    );
}
