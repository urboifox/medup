import { Testimonial } from "@/features/home/types";
import icons from "@/lib/icons";
import { UserType } from "@/types/user";
import { useTranslations } from "next-intl";
import Image from "next/image";

const userTypesTranslationKey = {
    [UserType.Expert]: "common.expert",
    [UserType.Trainee]: "common.trainee",
    [UserType.Student]: "common.student",
    [UserType.Researcher]: "common.researcher"
} as const;

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const t = useTranslations();

    return (
        <article className="bg-white rounded-3xl py-10 px-5 flex flex-col gap-10">
            <div className="gap-5 flex flex-col">
                <Image src={icons.quote} alt="Quote" width={30} height={30} />
                <p className="text-dark-300 text-sm line-clamp-3" title={testimonial.content}>
                    {testimonial.content}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Image
                    src={testimonial.user.avatar}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover aspect-square w-10"
                />
                <div className="flex flex-col gap-[2px]">
                    <p
                        className="text-dark-400 font-semibold text-sm line-clamp-1"
                        title={testimonial.user.name}
                    >
                        {testimonial.user.name}
                    </p>
                    <p className="text-dark-200 text-sm">
                        {t(userTypesTranslationKey[testimonial.user.type])}
                    </p>
                </div>
            </div>
        </article>
    );
}
