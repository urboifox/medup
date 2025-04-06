"use client";
import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { rateOrderAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaRegStar, FaStar } from "react-icons/fa6";

export default function OrderRating({ orderId }: { orderId: string }) {
    const t = useTranslations();
    const router = useRouter();
    const [rating, setRating] = useState(0);

    const [state, action, pending] = useActionState(rateOrderAction, {
        success: false,
        formData: new FormData()
    });
    const ratingError = state.errors?.rating;

    useEffect(() => {
        if (state.success) {
            router.refresh();
            toast.success(t("common.reviewAdded"));
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, router, t]);

    return (
        <form
            className="flex flex-col gap-4"
            action={(formData) => {
                formData.set("orderId", orderId);
                formData.set("rating", rating.toString());
                action(formData);
            }}
        >
            <div className="flex flex-col gap-1">
                <p className="text-dark-300">{t("labels.rating")}</p>
                <div className="flex items-center gap-2">
                    {Array(5)
                        .fill(null)
                        .map((_, idx) => {
                            return (
                                <button key={idx} type="button" onClick={() => setRating(idx + 1)}>
                                    {idx < rating ? (
                                        <FaStar size={32} className="text-yellow-500" />
                                    ) : (
                                        <FaRegStar size={32} />
                                    )}
                                </button>
                            );
                        })}
                </div>
                {ratingError && (
                    <div className="text-sm text-red-500">
                        {typeof ratingError === "string"
                            ? ratingError
                            : ratingError?.map((e: string, index: number) => (
                                  <p key={index}>{e}</p>
                              ))}
                    </div>
                )}
            </div>
            <Textarea
                name="description"
                label={t("labels.description")}
                placeholder={t("placeholders.writeSomething")}
                defaultValue={state.formData?.get("description") as string}
                error={state.errors?.description}
            />
            <Button type="submit" disabled={pending} className="w-fit">
                {t("common.submit")}
            </Button>
        </form>
    );
}
