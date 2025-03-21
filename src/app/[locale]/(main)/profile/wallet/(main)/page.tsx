import NoResults from "@/components/ui/no-results";
import Pagination from "@/components/ui/pagination";
import { getTransactions } from "@/features/wallet/services";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import moment from "moment";
import { getLocale, getTranslations } from "next-intl/server";
import { BiTransfer } from "react-icons/bi";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";

export default async function WalletPage({
    searchParams
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const t = await getTranslations();
    const locale = await getLocale();
    const { type, page } = await searchParams;
    const validTypes = ["0", "1", "2"];
    const { data: transactions, meta } = await getTransactions({
        params: {
            type: validTypes.includes(type as string) ? (type as string) : "",
            page: (page as string) || "1"
        }
    });

    const links = [
        { title: t("common.all"), type: "", icon: null },
        { title: t("common.deposit"), type: "0", icon: <GoArrowUpRight size={24} /> },
        { title: t("common.withdraw"), type: "1", icon: <GoArrowDownLeft size={24} /> },
        { title: t("common.transfer"), type: "2", icon: <BiTransfer size={24} /> }
    ];

    const transactionTypes = {
        0: t("common.deposit"),
        1: t("common.withdrawal"),
        2: t("common.transfer")
    };

    const icons = {
        0: <GoArrowUpRight size={24} />,
        1: <GoArrowDownLeft size={24} />,
        2: <BiTransfer size={24} />
    };

    const iconStlyes = {
        0: "bg-[#FF3B3B30] text-[#FF3B3B]",
        1: "bg-primary-50 text-primary-main",
        2: "bg-[#0063F730] text-[#0063F7]"
    };

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-semibold">{t("common.recentTransactions")}</h1>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-around gap-2 w-full">
                    {links.map((link, i) => {
                        return (
                            <Link
                                key={i}
                                className={cn(
                                    "text-lg font-semibold p-4 flex items-center gap-2",
                                    type === link.type || (link.type === "" && !type)
                                        ? "border-b-2 border-primary-main text-primary-main"
                                        : ""
                                )}
                                href={"/profile/wallet?type=" + link.type}
                            >
                                {link.icon}
                                {link.title}
                            </Link>
                        );
                    })}
                </div>
                <div className="flex flex-col gap-2">
                    {transactions?.length === 0 && <NoResults />}
                    {transactions?.map((transaction, i) => {
                        const formattedDate = moment(transaction.created_at)
                            .locale(locale)
                            .calendar(null, {
                                sameDay: `[${t("common.today")}] h:mm A`,
                                lastDay: `[${t("common.yesterday")}] h:mm A`,
                                lastWeek: "dddd h:mm A",
                                sameElse: "MMM D, YYYY h:mm A"
                            });

                        return (
                            <article key={i} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-6">
                                    <div
                                        className={cn(
                                            "w-14 h-14 flex items-center justify-center rounded-full",
                                            iconStlyes[transaction.type]
                                        )}
                                    >
                                        {icons[transaction.type]}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-medium">
                                            {transactionTypes[transaction.type]}
                                        </p>
                                        <p className="text-dark-300">{transaction.description}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <p className="text-xl text-primary-main font-semibold">
                                        ${transaction.amount}
                                    </p>
                                    <p>{formattedDate}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
                <Pagination
                    currentPage={parseInt((page as string) || "1")}
                    lastPage={(meta?.last_page as number) || 1}
                />
            </div>
        </div>
    );
}
