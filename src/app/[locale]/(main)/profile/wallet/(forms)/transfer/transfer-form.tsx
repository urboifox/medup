"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { transferAction } from "./action";
import Textarea from "@/components/ui/textarea";

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
                min="0"
            />
            <Input
                label={t("labels.email")}
                name="email"
                placeholder="example@mail.com"
                defaultValue={state?.formData?.get("email") as string}
                error={state?.errors?.email}
            />
            <Textarea
                name="description"
                label={t("labels.description")}
                error={state?.errors?.description}
                defaultValue={state?.formData?.get("description") as string}
            ></Textarea>
            <Button type="submit" disabled={pending}>
                {t("wallet.confirmTransfer")}
            </Button>
        </form>
    );
}
