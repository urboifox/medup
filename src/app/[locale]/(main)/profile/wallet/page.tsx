import Button from "@/components/ui/button";
import { getBalance, getTransactions } from "@/features/wallet/services";
import { getTranslations } from "next-intl/server"
import { AiOutlineBank } from "react-icons/ai";

export default async function WalletPage() {
    const t = await getTranslations();
    const { data: balance } = await getBalance();
    const { data: transactions } = await getTransactions();

    return (
        <div className="container flex flex-col gap-8 py-14">
            <h1 className="text-2xl font-semibold">{t("common.walletMangement")}</h1>
            <div className="bg-light-200 p-6 rounded-xl flex flex-col gap-2 items-center">
                <p className="text-lg text-dark-300">{t("common.availableBalance")}</p>
                <p className="font-semibold text-3xl text-primary-main">${balance?.balance || 0}</p>
            </div>
            <div className="flex items-center justify-center gap-4">
                <Button>
                    <AiOutlineBank size={20} />
                    {t("common.withdraw")}
                </Button>
            </div>
            <h1 className="text-2xl font-semibold">{t("common.recentTransactions")}</h1>
            <div>
                {JSON.stringify(transactions, null, 2)}
            </div>
        </div>
    )
}
