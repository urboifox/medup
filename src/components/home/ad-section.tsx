"use client";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Image from "next/image";

export default function AdSection({ ads }: { ads: { id: number; image: string }[] }) {
    return (
        <div className="py-10 container">
            <Swiper modules={[Autoplay, Navigation]} autoplay={{ delay: 20000 }} loop navigation>
                {ads?.map((ad, i) => (
                    <SwiperSlide key={i}>
                        <div className="rounded-lg container bg-gray-100 h-80 aspect-video flex items-center justify-center">
                            <Image src={ad.image} alt="Ad" fill className="object-contain" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
