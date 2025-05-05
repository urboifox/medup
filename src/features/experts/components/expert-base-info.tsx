import Image from "next/image";
import { Expert } from "../types";
import { FaUniversity } from "react-icons/fa";
import { FaMapPin, FaSuitcase } from "react-icons/fa6";
import { LuBadgeCheck } from "react-icons/lu";
import { useTranslations } from "next-intl";
import StarsRating from "@/components/ui/stars-rating";

export default function ExpertBaseInfo({ expert }: { expert: Expert }) {
    const t = useTranslations();

    return (
        <div className="flex items-center gap-6 flex-col md:flex-row">
            <Image
                src={expert.user.avatar}
                alt={expert.user.name}
                width={460}
                height={460}
                className="rounded-3xl object-cover aspect-square"
            />
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
                            {expert?.city.name}
                        </p>
                        <span className="text-sm font-medium text-primary-main capitalize flex items-center gap-1">
                            <LuBadgeCheck size={18} />
                            {expert?.experience_years || 0} {t("common.years")}
                        </span>
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
