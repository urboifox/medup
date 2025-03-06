import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Course } from "../types";

export default function CourseCard({ course }: { course: Course }) {
    const t = useTranslations();

    return (
        <Link href={"/courses/" + course.id} className="w-full">
            <article className="flex flex-col gap-4 group w-full rounded-xl border border-light-300">
                <div className="w-full relative aspect-video">
                    <Image
                        src={course.cover}
                        alt={course.name}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-4 p-4">
                    <h3 className="font-semibold lg:text-lg group-hover:underline">
                        {course.name}
                    </h3>
                    <p className="text-sm">
                        {t("common.by")}: {course.expert.user.name}
                    </p>
                    <p className="line-clamp-3 text-dark-300 text-sm">{course.description}</p>
                    <p className="text-primary-main font-semibold">${course.price}</p>
                </div>
            </article>
        </Link>
    );
}
