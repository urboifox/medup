import { Link } from "@/i18n/routing";
import { FiArrowLeft } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { College } from "@/features/select-menu/types";

export default function HomeCollegeCard({ college }: { college: College }) {
    const t = useTranslations();

    return (
        <article className="transition-colors duration-200 hover:bg-primary-main px-2 py-4 sm:px-8 sm:py-10 flex-1 flex flex-col gap-6 group">
            <div>
                {/*
                    INFO: Brwoser will block the background image SVG with mask using external image
                    so loading it before the mask elements makes the browser happy
                */}
                <div
                    style={{ backgroundImage: `url(${college.icon})` }}
                    className="invisible h-0"
                />
                <div
                    className="w-12 h-12 bg-primary-main transition-all duration-200 group-hover:bg-white"
                    style={{
                        mask: `url(${college.icon}) no-repeat center / contain`,
                        WebkitMask: `url(${college.icon}) no-repeat center / contain`
                    }}
                />
            </div>

            <h3 className="font-semibold text-sm sm:text-xl text-foreground-100 group-hover:text-white transition-colors duration-200">
                {college.name}
            </h3>
            <p className="text-[10px] sm:text-sm font-medium text-foreground-50 group-hover:text-light-400 transition-colors duration-200 max-w-md">
                {college.description}
            </p>
            {/* <p className="text-sm font-medium text-foreground-50 group-hover:text-light-400 transition-colors duration-200 max-w-md"> */}
            {/*     {t("common.experts")}: {college.experts_count} */}
            {/* </p> */}

            <Link
                href={`/experts?colleges=${college.id}`}
                className="text-xs sm:text-base text-primary-main group-hover:text-white transition-colors duration-200 w-max sm:font-semibold flex items-center justify-center w-fit gap-2 group/link"
            >
                {t("home.colleges.cta")}
                <FiArrowLeft className="ltr:rotate-180 ltr:group-hover/link:translate-x-1 group-hover/link:-translate-x-1 transition-transform duration-200 shrink-0" />
            </Link>
        </article>
    );
}
