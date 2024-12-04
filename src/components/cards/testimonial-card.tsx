import icons from "@/lib/icons";
import images from "@/lib/images";
import Image from "next/image";

export default function TestimonialCard() {
    return (
        <article className="bg-white rounded-3xl py-10 px-5 flex flex-col gap-10">
            <div className="gap-5 flex flex-col">
                <Image src={icons.quote} alt="Quote" width={30} height={30} />
                <p className="text-dark-300 text-sm line-clamp-3">
                    فريق رائع ومعاملة رائعة من أفضل طبيب في العالم فريق رائع ومعاملة رائعة من أفضل
                    طبيب في العالم
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Image
                    src={images.doctorProfile}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover aspect-square w-10"
                />
                <div className="flex flex-col gap-[2px]">
                    <p className="text-dark-400 font-semibold text-sm">كريم محمد</p>
                    <p className="text-dark-200 text-sm">متدرب جديد</p>
                </div>
            </div>
        </article>
    );
}
