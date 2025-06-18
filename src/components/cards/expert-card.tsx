import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FaCrown, FaMapPin, FaSuitcase } from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";
import StarsRating from "../ui/stars-rating";
import { Expert } from "@/features/experts/types";
import { UserType } from "@/types/user";

export default function ExpertCard({ expert }: { expert: Expert }) {
    const t = useTranslations();

    const typesMap: Record<UserType, string> = {
        "1": t("common.expert"),
        "2": t("common.trainee"),
        "3": t("common.student"),
        "4": t("common.researcher")
    };

    return (
        <article className="flex flex-col gap-3">
            <div className="relative aspect-square rounded-3xl overflow-hidden">
                <Image
                    src={expert.user?.avatar}
                    alt={expert.user?.name}
                    fill
                    className="object-cover"
                />
                <div className="flex items-center gap-2 absolute start-4 bottom-4">
                    {expert.is_premium && (
                        <div className="flex items-center gap-2 text-sm text-yellow-600 bg-white px-2 py-1 rounded-md">
                            <FaCrown />
                            <span>{t("common.premium")}</span>
                        </div>
                    )}
                    {expert.user?.type && expert.user.type !== UserType.Researcher && (
                        <div className="flex items-center gap-2 text-sm text-primary-main bg-white px-2 py-1 rounded-md">
                            <span>{typesMap[expert.user?.type]}</span>
                        </div>
                    )}
                </div>
            </div>
            <StarsRating value={expert?.rating_average} showNumber />
            <Link className="flex flex-col gap-2" href={`/experts/${expert.id}`}>
                <h3 className="lg:text-xl font-semibold line-clamp-1" title={expert.user.name}>
                    {expert.user?.name}
                </h3>
            </Link>
            <div className="flex items-center gap-2 justify-between flex-wrap">
                <p className="line-clamp-1 text-sm text-foreground-100 font-medium flex items-center gap-2">
                    <FaUniversity />
                    {expert?.speciality.college.name}
                </p>
                <p className="line-clamp-1 text-sm text-foreground-100 font-medium flex items-center gap-2">
                    <FaMapPin />
                    {expert?.city.country.name}, {expert?.city.name}
                </p>
            </div>
            <div className="flex items-center gap-2 justify-between flex-wrap">
                <p className="line-clamp-1 text-sm text-foreground-100 font-medium flex items-center gap-2">
                    <FaSuitcase />
                    {expert?.speciality.name}
                </p>
                <span className="text-sm font-medium text-primary-main capitalize flex items-center gap-1">
                    <LuBadgeCheck size={18} />
                    {expert?.experience_years || 0} {t("common.years")}
                </span>
            </div>
            <div className="flex flex-wrap gap-2 max-h-16 overflow-hidden">
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
        </article>
    );
}
