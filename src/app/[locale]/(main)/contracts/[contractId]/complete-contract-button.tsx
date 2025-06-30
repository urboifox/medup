"use client";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useAuthStore } from "@/features/auth/store";
import { openContractAction } from "@/features/contracts/actions";
import { Contract } from "@/features/contracts/types";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { toast } from "sonner";

export default function CompleteContractButton({ contract }: { contract: Contract }) {
    const t = useTranslations();
    const [modalOpen, setModalOpen] = useState(false);
    const user = useAuthStore((state) => state.user);

    const iNeedToSign = contract.second_member === user?.id && contract.paid === false;

    const [state, action, pending] = useActionState(openContractAction, {
        success: false,
        formData: new FormData()
    });

    useEffect(() => {
        if (state.success) {
            toast.success(t("common.contractCreatedSuccessfully"));
            setModalOpen(false);
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, t]);

    return (
        <>
            <Modal visible={modalOpen} onClose={() => setModalOpen(false)}>
                <form
                    action={(fd) => {
                        fd.set("contract_id", contract.id.toString());
                        action(fd);
                    }}
                    className="bg-white p-8 rounded-xl flex flex-col gap-4 w-screen max-w-lg"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Confirm contract payment</h2>
                        <button type="button" onClick={() => setModalOpen(false)}>
                            <FaX />
                        </button>
                    </div>
                    <p>
                        By confirming, you agree to the contract terms and conditions. and will pay{" "}
                        <span className="text-primary-main font-semibold">${contract.price}</span>{" "}
                        USD.
                    </p>
                    <Button type="submit">{t("common.confirm")}</Button>
                </form>
            </Modal>
            {iNeedToSign && (
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setModalOpen(true)}
                    disabled={pending}
                >
                    Confirm contract payment
                </Button>
            )}
        </>
    );
}
