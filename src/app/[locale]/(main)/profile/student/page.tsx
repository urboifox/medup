import Button from "@/components/ui/button";
import InfoCardWrapper from "@/features/experts/components/info-card-wrapper";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { redirect } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { getBasicProfile } from "@/features/auth/services";
import UserBaseInfo from "@/features/experts/components/user-base-info";

export default async function ProfilePage() {
    const t = await getTranslations();

    const { data: user } = await getBasicProfile();

    if (!user) {
        return redirect("/logout");
    }

    return (
        <div className="container py-10">
            <div className="flex flex-col lg:flex-row gap-10 justify-between">
                <div className="flex flex-col gap-10 max-w-3xl">
                    <UserBaseInfo user={user} />
                </div>

                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-2 justify-end">
                        <Link href="/profile/contracts" className="lg:self-end">
                            <Button className="w-fit self-end">{t("common.viewContracts")}</Button>
                        </Link>
                        <Link href="/profile/edit" className="lg:self-end">
                            <Button className="w-fit self-end" variant="secondary">
                                <FaEdit size={20} />
                                {t("experts.editProfile")}
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-5 max-w-lg min-w-80">
                        <InfoCardWrapper label={t("experts.transactions")}>
                            <div className="flex flex-col gap-4 items-center">
                                <Link href="/profile/wallet" className="w-full">
                                    <Button className="w-full">
                                        <CiBank size={28} />
                                        {t("experts.checkYourTransactions")}
                                    </Button>
                                </Link>
                            </div>
                        </InfoCardWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
}
