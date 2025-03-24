"use client";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { makeOrderAction } from "../actions";
import { toast } from "sonner";

interface Props {
    id: string;
    price: number;
    type: "library" | "course";
}

export default function BuyButton({ id, price = 0, type }: Props) {
    const t = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const [state, action, pending] = useActionState(makeOrderAction, null);

    useEffect(() => {
        if (state?.success) {
            setIsOpen(false);
            toast.success(t("common.operationSuccessful"));
        } else if (state?.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <>
            <Modal visible={isOpen} onClose={() => setIsOpen(false)}>
                <div className="bg-white rounded-md p-12 items-center shadow-lg flex flex-col gap-8">
                    <div className="flex flex-col gap-2 items-center text-center">
                        <h2 className="text-2xl font-semibold">{t("orders.areYouSure")}</h2>
                        <p className="text-dark-300 max-w-md">
                            {t("orders.areYouSureDescription", { amount: price })}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button onClick={() => setIsOpen(false)} variant="outline">
                            {t("common.cancel")}
                        </Button>
                        <form
                            action={(formData) => {
                                formData.set("id", id);
                                formData.set("type", type);
                                action(formData);
                            }}
                        >
                            <Button disabled={pending} className="bg-primary-main">
                                {t("common.confirm")}
                            </Button>
                        </form>
                    </div>
                </div>
            </Modal>

            <Button onClick={() => setIsOpen(true)} className="w-fit">
                {t("common.buyNow")}
            </Button>
        </>
    );
}
