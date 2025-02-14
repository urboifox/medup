import Button from "@/components/ui/button";
import ExpertBaseInfo from "@/features/experts/components/expert-base-info";
import { getAllExperts, getExpert } from "@/features/experts/services";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

export default async function ExpertPage({ params }: { params: Promise<{ id: string }> }) {
    const t = await getTranslations();
    const { id } = await params;
    const res = await getExpert(id);
    const expert = res?.data;

    if (!expert) {
        return redirect("/experts");
    }

    return (
        <div className="container py-20">
            <div className="flex flex-col lg:flex-row gap-5 justify-between">
                <div className="flex flex-col gap-10">
                    <ExpertBaseInfo expert={expert} />

                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">
                            {t("common.about")} {expert.user.name}
                        </h3>
                    </div>

                    {/* experience */}
                </div>

                <div className="flex flex-col gap-10">
                    <Button className="w-fit self-end">
                        {t("experts.chatNow")}
                        <span className="rtl:rotate-180">
                            <HiOutlineArrowSmallRight size={20} />
                        </span>
                    </Button>
                    <div className="flex flex-col gap-5 max-w-lg">
                        <div className="p-6 rounded-lg border-2 border-info-50 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-xl">
                                    {t("experts.onlineMedicalConsultation")}
                                </h3>
                                <p className="text-dark-300">
                                    {t("experts.onlineMedicalConsultationDescription")}
                                </p>
                            </div>
                            <Button>{t("experts.consultNow")}</Button>
                        </div>
                        <div className="p-6 rounded-lg border-2 border-info-50 flex flex-col gap-6">
                            <h3 className="font-semibold text-xl">{t("common.information")}</h3>
                            <div className="grid grid-cols-3 gap-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const { data: experts } = await getAllExperts({ skipAuth: true, skipLocale: true });
    const staticParams = experts?.map((expert) => ({ id: expert.id.toString() }));
    return staticParams ?? [];
}
