"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { transferAction } from "./action";

export default function TransferForm() {
    const t = useTranslations();
    const [state, action, pending] = useActionState(transferAction, null);

    useEffect(() => {
        if (state?.success) {
            toast.success(t("wallet.transferSuccess"));
        } else if (state?.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form className="flex flex-col gap-4" action={action}>
            <Input
                label={t("wallet.amount")}
                type="number"
                error={state?.errors?.amount}
                defaultValue={state?.formData?.get("amount") as string}
                name="amount"
                placeholder="0.00"
                placeholderIcon={<span>$</span>}
            />
            <Input label={t("wallet.walletNumber")} name="wallet_number" placeholder="123456" />
            <Input label={t("wallet.recipientName")} name="recipient_name" placeholder="John Doe" />
            <Button type="submit" disabled={pending}>
                {t("wallet.confirmTransfer")}
            </Button>
        </form>
    );
}
