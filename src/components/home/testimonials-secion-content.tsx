"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Swiper as SwiperCore } from "swiper";
import Button from "../ui/button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "../cards/testimonial-card";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { Testimonial } from "@/features/home/types";

export default function TestimonialsSectionContent({
    testimonials
}: {
    testimonials: Testimonial[];
}) {
    const t = useTranslations();

    const swiperRef = useRef<SwiperCore | null>(null);

    function handleNext() {
        swiperRef.current?.slideNext();
    }

    function handlePrev() {
        swiperRef.current?.slidePrev();
    }

    return (
        <section className="py-20 lg:py-40 bg-light-200">
            <div className="container flex flex-col gap-10 lg:gap-20">
                <div className="flex items-center gap-10 lg:gap-4 flex-col lg:flex-row justify-between">
                    <div className="flex flex-col gap-5">
                        <h3 className="max-w-md font-bold text-3xl lg:text-5xl text-foreground-200">
                            {t("home.testimonials.title")}
                        </h3>
                        <p className="text-dark-300 max-w-md">
                            {t("home.testimonials.description")}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button onClick={handlePrev} className="rounded-full aspect-square p-3">
                            <FiChevronRight size={24} className="ltr:rotate-180" />
                        </Button>
                        <Button onClick={handleNext} className="rounded-full aspect-square p-3">
                            <FiChevronLeft size={24} className="ltr:rotate-180" />
                        </Button>
                    </div>
                </div>

                <div>
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false
                        }}
                        modules={[Autoplay]}
                        breakpoints={{
                            480: {
                                slidesPerView: 2
                            },
                            1024: {
                                slidesPerView: 3
                            },
                            1280: {
                                slidesPerView: 4
                            },
                            1536: {
                                slidesPerView: 5
                            }
                        }}
                    >
                        {testimonials.map((testimonial, idx) => {
                            return (
                                <SwiperSlide key={idx}>
                                    <TestimonialCard testimonial={testimonial} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
