import icons from "@/lib/icons";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function HomeCategoryCard() {
    return (
        <article className="transition-colors duration-200 hover:bg-primary-main px-8 py-10 flex-1 flex flex-col gap-6 group">
            <div
                className="w-12 h-12 bg-primary-main mask mask-image flex items-center justify-center transition-all duration-200 group-hover:bg-white"
                style={{
                    maskImage: `url(${icons.stethoscope})`,
                    WebkitMaskImage: `url(${icons.stethoscope})`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center"
                }}
            ></div>
            <h3 className="font-semibold text-xl text-foreground-100 group-hover:text-white transition-colors duration-200">
                طب بشري
            </h3>
            <p className="text-sm font-semibold text-foreground-50 group-hover:text-light-400 transition-colors duration-200 max-w-md">
                تعرف على الممارسات السريرية وأساسيات رعاية المرضى للتحضير للتحديات الحقيقية في مجال
                الرعاية الصحية.
            </p>

            <Link
                href="/"
                className="text-primary-main group-hover:text-white transition-colors duration-200 font-bold flex items-center justify-center w-fit gap-2 group/link"
            >
                احجز استشارة
                <FiArrowLeft className="group-hover/link:-translate-x-1 transition-transform duration-200" />
            </Link>
        </article>
    );
}
