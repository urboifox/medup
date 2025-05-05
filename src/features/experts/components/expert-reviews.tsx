"use client";
import StarsRating from "@/components/ui/stars-rating";
import { Expert } from "../types";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import moment from "moment";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useAuthStore } from "@/features/auth/store";
import ExpertRatingForm from "./expert-rating-form";
import Image from "next/image";

const reviewsLimit = 5;

export default function ExpertReviews({ expert }: { expert: Expert }) {
    const t = useTranslations();
    const locale = useLocale();
    const user = useAuthStore((state) => state.user);

    const [page, setPage] = useState(1);
    const filteredReviews = useMemo(() => {
        return expert.reviews.slice((page - 1) * reviewsLimit, page * reviewsLimit);
    }, [page, expert.reviews]);

    return (
        <div className="flex flex-col gap-6">
            <div className="p-10 rounded-md bg-gray-50 flex flex-col gap-4">
                <h3 className="text-3xl font-semibold">Reviews</h3>
                <div className="flex items-center gap-4">
                    <h4 className="text-3xl font-semibold">{expert.rating_average}</h4>
                    <div className="flex flex-col gap-1">
                        <StarsRating value={expert.rating_average} />
                        <p className="text-dark-300 text-sm">
                            {t("reviews.basedOnCount", { count: expert.reviews.length })}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {filteredReviews.map((review) => {
                        return (
                            <article key={review.id} className="flex gap-4 py-4 px-2">
                                <Image
                                    height="56"
                                    width="56"
                                    src={review.user.avatar}
                                    alt={review.user.name}
                                    className="rounded-full aspect-square"
                                />
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="justify-between items-center gap-4 flex w-full">
                                        <div className="flex items-center gap-2">
                                            <h5 className="text-lg font-semibold line-clamp-1 break-words">
                                                {review.user.name}
                                            </h5>
                                            <span className="text-dark-300">•</span>
                                            <StarsRating value={review.rating} />
                                        </div>
                                        <time className="text-sm text-dark-300">
                                            {moment(review.created_at).locale(locale).format("LL")}
                                        </time>
                                    </div>
                                    <p className="text-dark-300 line-clamp-3">
                                        {review.description}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {expert.reviews.length > reviewsLimit && (
                    <div className="gap-6 flex items-center justify-center">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="flex items-center text-sm gap-2 transition-colors duration-200 hover:text-primary-main disabled:cursor-not-allowed disabled:text-dark-300"
                        >
                            <span className="rtl:rotate-180">
                                <FaArrowLeft size={16} />
                            </span>
                            {t("common.previous")}
                        </button>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === Math.ceil(expert.reviews.length / 5)}
                            className="flex items-center text-sm gap-2 transition-colors duration-200 hover:text-primary-main disabled:cursor-not-allowed disabled:text-dark-300"
                        >
                            {t("common.next")}
                            <span className="rtl:rotate-180">
                                <FaArrowRight size={16} />
                            </span>
                        </button>
                    </div>
                )}
            </div>
            {!expert.reviewed && user && (
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{t("labels.leaveAReview")}</h3>
                    <ExpertRatingForm expertId={expert.id.toString()} />
                </div>
            )}
        </div>
    );
}
