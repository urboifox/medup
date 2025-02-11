import { Link } from "@/i18n/routing";
import { FiArrowLeft } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { College } from "@/features/select-menu/types";

export default function HomeCollegeCard({ college }: { college: College }) {
    const t = useTranslations();

    return (
        <article className="transition-colors duration-200 hover:bg-primary-main px-8 py-10 flex-1 flex flex-col gap-6 group">
            <div
                className="w-12 h-12 bg-primary-main mask mask-image flex items-center justify-center transition-all duration-200 group-hover:bg-white"
                style={{
                    maskImage: `url(${college.icon})`,
                    WebkitMaskImage: `url(${college.icon})`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center"
                }}
            ></div>
            <h3 className="font-semibold text-xl text-foreground-100 group-hover:text-white transition-colors duration-200">
                {college.name}
            </h3>
            <p className="text-sm font-medium text-foreground-50 group-hover:text-light-400 transition-colors duration-200 max-w-md">
                {college.description}
            </p>

            <p className="text-sm font-medium text-foreground-50 group-hover:text-light-400 transition-colors duration-200 max-w-md">
                {t("common.experts")}: {college.experts_count}
            </p>

            <Link
                href={`/experts?colleges=${college.id}`}
                className="text-primary-main group-hover:text-white transition-colors duration-200 font-semibold flex items-center justify-center w-fit gap-2 group/link"
            >
                {t("home.categories.cta")}
                <FiArrowLeft className="ltr:rotate-180 ltr:group-hover/link:translate-x-1 group-hover/link:-translate-x-1 transition-transform duration-200" />
            </Link>
        </article>
    );
}
