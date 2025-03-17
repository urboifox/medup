import { getBalance } from "@/features/wallet/services";
import { getTranslations } from "next-intl/server";
import WalletFormsHeader from "./header";

export default async function WalletFormsLayout({ children }: { children: React.ReactNode }) {
    const t = await getTranslations();
    const { data: balance } = await getBalance({
        next: {
            tags: ["wallet"]
        }
    });

    return (
        <div className="container flex flex-col gap-8 py-14">
            <WalletFormsHeader />
            <h1 className="text-2xl font-semibold">{t("common.walletMangement")}</h1>
            <div className="bg-light-200 p-6 rounded-xl flex flex-col gap-2 items-center">
                <p className="text-lg text-dark-300">{t("common.availableBalance")}</p>
                <p className="font-semibold text-3xl text-primary-main">${balance?.balance || 0}</p>
            </div>
            {children}
        </div>
    );
}
