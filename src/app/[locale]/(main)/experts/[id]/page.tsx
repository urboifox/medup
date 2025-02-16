import Button from "@/components/ui/button";
import ExpertBaseInfo from "@/features/experts/components/expert-base-info";
import ExpertProfileActionButton from "@/features/experts/components/expert-profile-action-button";
import ExpertProfileExperience from "@/features/experts/components/expert-profile-experience";
import ExpertProfileInformation from "@/features/experts/components/expert-profile-information";
import ExpertsContentSkeleton from "@/features/experts/components/experts-content-skeleton";
import RecommendedExpertsContentMap from "@/features/experts/components/recommended-experts-content-map";
import { getAllExperts, getExpert } from "@/features/experts/services";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

function InfoCardWrapper({ children, label }: { children?: React.ReactNode; label?: string }) {
    return (
        <div className="p-6 rounded-lg border-2 border-info-50 flex flex-col gap-6">
            <h3 className="font-semibold text-xl">{label}</h3>
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    );
}

export default async function ExpertPage({ params }: { params: Promise<{ id: string }> }) {
    const t = await getTranslations();
    const { id } = await params;
    const res = await getExpert(id);
    const expert = res?.data;

    if (!expert) {
        return notFound();
    }

    return (
        <div className="container py-20 flex flex-col gap-20">
            <div className="flex flex-col lg:flex-row gap-5 justify-between">
                <div className="flex flex-col gap-10">
                    <ExpertBaseInfo expert={expert} />

                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">
                            {t("common.about")} {expert.user.name}
                        </h3>
                        <p className="text-dark-300">{expert.headline ?? t("experts.noAbout")}</p>
                    </div>

                    <ExpertProfileExperience expert={expert} />
                </div>

                <div className="flex flex-col gap-10">
                    <ExpertProfileActionButton expert={expert} />
                    <div className="flex flex-col gap-5 max-w-lg">
                        <InfoCardWrapper label={t("experts.onlineMedicalConsultation")}>
                            <div className="flex flex-col gap-2">
                                <p className="text-dark-300">
                                    {t("experts.onlineMedicalConsultationDescription")}
                                </p>
                            </div>
                            <Button>{t("experts.consultNow")}</Button>
                        </InfoCardWrapper>
                        <InfoCardWrapper label={t("common.information")}>
                            <ExpertProfileInformation expert={expert} />
                        </InfoCardWrapper>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <h2 className="text-xl lg:text-3xl font-semibold">
                    {t("experts.recommendedExperts")}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
                    <Suspense fallback={<ExpertsContentSkeleton />}>
                        <RecommendedExpertsContentMap />
                    </Suspense>
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
