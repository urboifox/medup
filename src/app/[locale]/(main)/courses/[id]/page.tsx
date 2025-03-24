import Button from "@/components/ui/button";
import CourseCard from "@/features/courses/components/course-card";
import { getCourse, getCourses } from "@/features/courses/services";
import BuyButton from "@/features/orders/components/buy-button";
import { Link } from "@/i18n/routing";
import moment from "moment";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AiOutlineWarning } from "react-icons/ai";

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await getCourse(id).catch(() => null);
    if (!res || !res.data) return notFound();
    const { data: course } = res;

    const locale = await getLocale();

    const { data: suggestedCourses } = await getCourses({
        params: {
            // suggested_based_id: id,
            per_page: "4"
        }
    });

    const t = await getTranslations();

    return (
        <div className="container flex flex-col gap-8 py-14 xl:flex-row">
            <div className="flex flex-col gap-14 xl:w-2/3">
                <div className="flex gap-6 items-center flex-col lg:flex-row">
                    <Image
                        src={course.cover}
                        alt={course.name}
                        width={300}
                        height={330}
                        className="shadow-xl object-cover w-[300px] h-[330px] rounded-md"
                    />
                    <div className="flex flex-col gap-4 w-full">
                        <h3 className="font-semibold lg:text-2xl xl:text-4xl">{course.name}</h3>
                        <p className="text-sm">
                            {t("common.by")}: {course.expert.user.name}
                        </p>
                        <p className="text-primary-main font-semibold">${course.price}</p>

                        {course.purchased ? (
                            <a href={course?.public_link} target="_blank" rel="noreferrer">
                                <Button>{t("common.view")}</Button>
                            </a>
                        ) : (
                            <BuyButton
                                price={course.price}
                                id={course.id.toString()}
                                type="course"
                            />
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold xl:text-3xl">
                        {t("labels.description")}
                    </h2>
                    <p>{course.description}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold xl:text-3xl">
                        {t("common.information")}
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("common.price")}</p>
                            <p className="text-dark-300">${course.price}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("common.buys")}</p>
                            <p className="text-dark-300">{41}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("labels.datePublished")}</p>
                            <p className="text-dark-300">
                                {moment(course.created_at || Date.now())
                                    .locale(locale)
                                    .format("LL")}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("labels.speciality")}</p>
                            <p className="text-dark-300">{course.speciality.name}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-dark-400 font-medium">{t("labels.author")}</p>
                            <p className="text-dark-300">{course.expert.user.name}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 items-start">
                    <AiOutlineWarning className="text-warning-main h-fit" size={64} />
                    <p>{t("common.libraryWarning")}</p>
                </div>
            </div>
            <div className="flex gap-4 flex-col xl:w-1/3">
                <h2 className="text-2xl font-semibold xl:text-3xl">{t("common.suggested")}</h2>
                <div className="flex gap-4 flex-col">
                    {suggestedCourses?.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}
