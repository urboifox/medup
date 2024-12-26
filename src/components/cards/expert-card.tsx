import images from "@/lib/images";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function ExpertCard() {
    return (
        <article className="flex flex-col gap-4 group">
            <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={images.doctorProfile} alt="Doctor" fill className="object-cover" />
                <div className="absolute -bottom-10 start-4 flex items-center gap-2 group-hover:bottom-4 transition-all duration-300">
                    <Link
                        href="https://facebook.com"
                        target="_blank"
                        className="text-white bg-primary-main w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-primary-100 active:bg-primary-200"
                    >
                        <FaFacebookF />
                    </Link>
                    <Link
                        href="https://x.com"
                        target="_blank"
                        className="text-white bg-primary-main w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-primary-100 active:bg-primary-200"
                    >
                        <FaXTwitter />
                    </Link>
                </div>
            </div>
            <Link className="flex flex-col gap-2" href="/experts/1">
                <div className="flex items-center gap-2 justify-between">
                    <p className="line-clamp-1 font-medium text-dark-400">أسنان</p>
                    <span className="text-sm font-medium text-primary-main">10 سنوات</span>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="lg:text-xl font-semibold">د. سامح محمود</h3>
                    <p className="text-dark-300 text-sm line-clamp-2">
                        تبييض الأسنان، تقنية إنفيزلاين، واقيات الأسنان الليلية
                    </p>
                </div>
            </Link>
        </article>
    );
}
