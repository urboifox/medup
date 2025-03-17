"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { depositAction } from "./action";
import { toast } from "sonner";

export default function WalletForm() {
    const t = useTranslations();
    const [state, action, pending] = useActionState(depositAction, null);

    useEffect(() => {
        if (state?.success) {
            toast.success(t("wallet.depositSuccess"));
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
            <Input
                label={t("wallet.cardNumber")}
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
            />
            <Input label={t("wallet.nameOnCard")} name="nameOnCard" placeholder="John Doe" />
            <div className="flex items-center gap-4 flex-col lg:flex-row">
                <Input
                    label={t("wallet.expirationDate")}
                    name="expirationDate"
                    placeholder="MM/YY"
                />
                <Input label={t("wallet.cvv")} name="cvv" placeholder="000" />
            </div>
            <Button type="submit" disabled={pending}>
                {t("wallet.confirmDeposit")}
            </Button>
        </form>
    );
}
