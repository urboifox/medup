import Image from "next/image";
import { Expert } from "../types";
import { FaUniversity } from "react-icons/fa";
import { FaCrown, FaMapPin, FaSuitcase } from "react-icons/fa6";
import { LuBadgeCheck } from "react-icons/lu";
import { useTranslations } from "next-intl";
import StarsRating from "@/components/ui/stars-rating";
import { UserType } from "@/types/user";

export default function ExpertBaseInfo({ expert }: { expert: Expert }) {
    const t = useTranslations();

    const typesMap: Record<UserType, string> = {
        "1": t("common.expert"),
        "2": t("common.trainee"),
        "3": t("common.student"),
        "4": t("common.researcher")
    };

    return (
        <div className="flex md:items-center gap-6 flex-col md:flex-row mx-auto">
            <div className="relative">
                <Image
                    src={expert.user.avatar}
                    alt={expert.user.name}
                    width={360}
                    height={360}
                    className="rounded-3xl object-cover aspect-square"
                />
                <div className="flex items-center gap-2 absolute start-4 bottom-4">
                    {expert.is_premium && (
                        <div className="flex items-center gap-2 text-sm text-yellow-600 bg-white px-2 py-1 rounded-md">
                            <FaCrown />
                            <span>{t("common.premium")}</span>
                        </div>
                    )}
                    {expert.user?.type && (
                        <div className="flex items-center gap-2 text-sm text-primary-main bg-white px-2 py-1 rounded-md">
                            <span>{typesMap[expert.user?.type]}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <h3 className="lg:text-xl font-semibold line-clamp-2" title={expert.user.name}>
                    {expert.user.name}
                </h3>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="line-clamp-1 text-sm text-foreground-100 font-medium flex items-center gap-2">
                            <FaUniversity />
                            {expert?.speciality.college.name}
                        </p>
                        <p className="line-clamp-1 text-sm text-foreground-100 font-medium flex items-center gap-2">
                            <FaSuitcase />
                            {expert?.speciality.name}
                        </p>
                        <p className="line-clamp-1 text-sm text-foreground-100 font-medium flex items-center gap-2">
                            <FaMapPin />
                            {expert?.city.country.name}, {expert?.city.name}
                        </p>
                        <span className="text-sm font-medium text-primary-main capitalize flex items-center gap-1">
                            <LuBadgeCheck size={18} />
                            {expert?.experience_years || 0} {t("common.years")}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 max-h-16 overflow-hidden text-sm text-foreground-100">
                        {t("common.skillCanTeach")}:
                        {expert?.skills.map((skill) => (
                            <p
                                key={skill.id}
                                className="text-primary-main border border-primary-50 hover:bg-primary-50 cursor-default transition-colors duration-100 rounded-full line-clamp-1 px-2 py-1"
                            >
                                {skill.name}
                            </p>
                        ))}
                    </div>
                    <StarsRating value={expert?.rating_average} showNumber />
                </div>

                <div className="flex flex-wrap gap-2 max-h-16 overflow-hidden">
                    {expert?.skills.map((skill) => (
                        <p
                            key={skill.id}
                            className="text-primary-main border border-primary-50 hover:bg-primary-50 cursor-default transition-colors duration-100 rounded-full text-xs line-clamp-1 px-2 py-1"
                        >
                            {skill.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
