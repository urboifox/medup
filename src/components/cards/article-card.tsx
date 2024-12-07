import moment from "moment";
import Tag from "../ui/tag";
import icons from "@/lib/icons";
import Image from "next/image";
import Link from "next/link";
import images from "@/lib/images";
import { cn } from "@/utils/cn";

export default function ArticleCard({
    className,
    imageContainerClassName
}: {
    className?: string;
    imageContainerClassName?: string;
}) {
    return (
        <article className={cn("flex-1 flex flex-col gap-6", className)}>
            <div className={cn("relative flex-1 w-full aspect-[1.6]", imageContainerClassName)}>
                <Image src={images.hero} alt="Doctor" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-6 flex-1 justify-center">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1 text-primary-main font-semibold text-sm">
                        <p>محمد أشرف</p> • <time>{moment().locale("ar").format("YYYY/MM/DD")}</time>
                    </div>
                    <Link href="/articles/1" className="hover:underline">
                        <h3 className="font-semibold text-lg lg:text-2xl text-dark-400 flex items-center gap-1 w-full justify-between">
                            تأثير التكنولوجيا على التشخيص الطبي الحديث
                            <Image
                                className="scale-x-[-1]"
                                src={icons.goto}
                                alt="Go to"
                                width={24}
                                height={24}
                            />
                        </h3>
                    </Link>
                    <p className="text-dark-300 line-clamp-3">
                        استكشاف كيف ساهمت التطورات التكنولوجية في تحسين دقة التشخيص الطبي، من الذكاء
                        الاصطناعي إلى التحليل الجيني، ودورها في تحسين رعاية المرضى.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Tag name="بحوثات" />
                </div>
            </div>
        </article>
    );
}
