"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Radio from "@/components/ui/radio";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { useAuthStore } from "@/features/auth/store";
import { openContractAction } from "@/features/contracts/actions";
import { Link } from "@/i18n/routing";
import { UserType } from "@/types/user";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { toast } from "sonner";

export default function ContractButton({
    contractId,
    otherUserId,
    traineeName,
    traineeEmail
}: {
    contractId?: number;
    otherUserId: number;
    traineeName?: string;
    traineeEmail?: string;
}) {
    const t = useTranslations();
    const [modalOpen, setModalOpen] = useState(false);
    const user = useAuthStore((state) => state.user);

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
                        fd.set("other_user_id", otherUserId.toString());
                        action(fd);
                    }}
                    className="bg-white p-8 rounded-xl flex flex-col gap-4 w-screen max-w-lg overflow-y-auto max-h-screen"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Scope of service</h2>
                        <button type="button" onClick={() => setModalOpen(false)}>
                            <FaX />
                        </button>
                    </div>
                    <Select label="Service Type" name="service_type">
                        <option value="1">Practical Training</option>
                        <option value="2">Online Learning</option>
                        <option value="3">Custom Programs</option>
                    </Select>
                    <Textarea name="description" label="Description" />
                    <Input name="sessions_per_week" label="Sessions/Week" type="number" />
                    <Input name="start_date" label="Start date" type="date" />
                    <Input name="end_date" label="End date" type="date" />
                    <div className="flex flex-col gap-2 w-full">
                        <p className="font-semibold text-lg">Training Location</p>
                        <div className="flex flex-col gap-4 text-dark-300">
                            <Radio
                                label="Via online platform"
                                value="1"
                                name="is_online"
                                defaultChecked
                            />
                            <Radio label="At physical location" value="0" name="is_online" />
                        </div>
                    </div>
                    <Input name="contract_start_date" label="Contract start date" type="date" />
                    <Input name="contract_end_date" label="Contract end date" type="date" />
                    <Input name="price" label="Contract value" type="number" />
                    <p className="font-semibold text-lg">Expert Information</p>
                    <Input name="expert_name" label="Expert name" defaultValue={user?.name} />
                    <Input
                        name="expert_email"
                        label="Expert Email"
                        type="email"
                        defaultValue={user?.email}
                    />
                    <p className="font-semibold text-lg">Trainee Information</p>
                    <Input name="trainee_name" label="Trainee name" defaultValue={traineeName} />
                    <Input
                        name="trainee_email"
                        label="Trainee Email"
                        type="email"
                        defaultValue={traineeEmail}
                    />
                    <Button type="submit">{t("common.confirm")}</Button>
                </form>
            </Modal>
            {contractId ? (
                <Link href={`/contracts/${contractId}`}>
                    <Button size="sm" variant="outline">
                        {t("common.viewDigitalContract")}
                    </Button>
                </Link>
            ) : [UserType.Expert, UserType.Researcher].includes(user?.type as UserType) ? (
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setModalOpen(true)}
                    disabled={pending}
                >
                    {t("common.openDigitalContract")}
                </Button>
            ) : (
                <></>
            )}
        </>
    );
}
