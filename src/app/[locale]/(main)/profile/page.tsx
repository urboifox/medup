import Button from "@/components/ui/button";
import ExpertBaseInfo from "@/features/experts/components/expert-base-info";
import ExpertProfileExperience from "@/features/experts/components/expert-profile-experience";
import ExpertProfileInformation from "@/features/experts/components/expert-profile-information";
import ExpertProfileSocialMedia from "@/features/experts/components/expert-profile-social-media";
import InfoCardWrapper from "@/features/experts/components/info-card-wrapper";
import {
    getExpertProfile,
    getProfileCertification,
    getProfileExperiences
} from "@/features/experts/services";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { redirect } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import ExpertProfileCertification from "@/features/experts/components/expert-profile-certification";
import { MdEdit } from "react-icons/md";

export default async function ProfilePage() {
    const t = await getTranslations();
    const { data: expert } = await getExpertProfile();
    const { data: experiences } = await getProfileExperiences();
    const { data: certification } = await getProfileCertification();

    if (!expert) {
        return redirect("/logout");
    }

    return (
        <div className="container py-20">
            <div className="flex flex-col lg:flex-row gap-10 justify-between">
                <div className="flex flex-col gap-10 max-w-3xl">
                    <ExpertBaseInfo expert={expert} />

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 justify-between">
                            <h3 className="text-xl font-semibold">{t("common.aboutYout")}</h3>
                            <Link
                                href={"/profile/edit"}
                                className="text-dark-300 transition-colors duration-200 hover:text-dark-400"
                            >
                                <MdEdit size={20} />
                            </Link>
                        </div>
                        <p className="text-dark-300">{expert.headline ?? t("experts.noAbout")}</p>
                    </div>

                    <ExpertProfileExperience
                        experience={experiences || []}
                        editUrl="/profile/experience"
                    />
                </div>

                <div className="flex flex-col gap-10">
                    <Link href="/profile/edit" className="lg:self-end">
                        <Button className="w-fit self-end" variant="secondary">
                            <FaEdit size={20} />
                            {t("experts.editProfile")}
                        </Button>
                    </Link>
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
                        <InfoCardWrapper label={t("common.information")}>
                            <ExpertProfileInformation expert={expert} />
                        </InfoCardWrapper>
                        <InfoCardWrapper label={t("common.socialMedia")}>
                            <ExpertProfileSocialMedia social_contacts={expert.social_contacts} />
                        </InfoCardWrapper>
                        <InfoCardWrapper
                            label={t("common.certification")}
                            editUrl="/profile/certification"
                        >
                            {certification ? (
                                <ExpertProfileCertification certification={certification} />
                            ) : (
                                <p>{t("experts.noCertification")}</p>
                            )}
                        </InfoCardWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
}
