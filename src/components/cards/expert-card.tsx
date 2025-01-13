import images from "@/lib/images";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FaCrown, FaIdBadge, FaMapPin, FaStar, FaSuitcase } from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";
import StarsRating from "../ui/stars-rating";

export default function ExpertCard() {
    const t = useTranslations();
    const skills = [
        t("temp.expertSkill"),
        t("temp.expertSkill"),
        t("temp.expertSkill"),
        t("temp.expertSkill"),
        t("temp.expertSkill")
    ];

    return (
        <article className="flex flex-col gap-3">
            <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={images.doctorProfile} alt="Doctor" fill className="object-cover" />
                <div className="absolute start-4 flex items-center gap-2 bottom-4 text-sm text-yellow-600 bg-white px-2 py-1 rounded-md">
                    <FaCrown />
                    <span>{t("common.premium")}</span>
                </div>
            </div>
            <StarsRating value={4} showNumber />
            <Link className="flex flex-col gap-2" href="/experts/1">
                <h3 className="lg:text-xl font-semibold">{t("temp.expertName")}</h3>
            </Link>
            <div className="flex items-center gap-2 justify-between flex-wrap">
                <p className="line-clamp-1 text-sm text-foreground-100 font-medium flex items-center gap-2">
                    <FaUniversity />
                    {t("temp.expertFaculty")}
                </p>
                <p className="line-clamp-1 text-sm text-foreground-100 font-medium flex items-center gap-2">
                    <FaMapPin />
                    {t("temp.expertAddress")}
                </p>
            </div>
            <div className="flex items-center gap-2 justify-between flex-wrap">
                <p className="line-clamp-1 text-sm text-foreground-100 font-medium flex items-center gap-2">
                    <FaSuitcase />
                    {t("temp.expertCategory")}
                </p>
                <span className="text-sm font-medium text-primary-main capitalize flex items-center gap-1">
                    <LuBadgeCheck size={18} />
                    10 {t("common.years")}
                </span>
            </div>
            <div className="flex flex-wrap gap-2 max-h-16 overflow-hidden">
                {skills.map((skill, i) => (
                    <p
                        key={i}
                        className="text-primary-main border border-primary-50 hover:bg-primary-50 cursor-default transition-colors duration-100 rounded-full text-xs line-clamp-1 px-2 py-1"
                    >
                        {skill}
                    </p>
                ))}
            </div>
        </article>
    );
}
