"use client";
import { useTranslations } from "next-intl";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function AdSection() {
    const t = useTranslations();

    return (
        <div className="py-10 container">
            <Swiper modules={[Autoplay, Navigation]} autoplay={{ delay: 20000 }} loop navigation>
                <SwiperSlide>
                    <div className="rounded-lg container bg-gray-100 h-80 flex items-center justify-center">
                        {t("common.adHere")}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded-lg container bg-gray-100 h-80 flex items-center justify-center">
                        {t("common.adHere")}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded-lg container bg-gray-100 h-80 flex items-center justify-center">
                        {t("common.adHere")}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
