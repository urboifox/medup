"use client";
import { useTranslations } from "next-intl";
import { ExpertExperience } from "../types";
import { Link } from "@/i18n/routing";
import { MdEdit } from "react-icons/md";
import { FaX } from "react-icons/fa6";
import Modal from "@/components/ui/modal";
import { useActionState, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { expertDeleteExperienceProfileAction } from "../actions";
import { toast } from "sonner";

export default function ExpertExperienceItem({ experience }: { experience: ExpertExperience }) {
    const t = useTranslations();

    const workTypeOptions = [
        { value: 0, label: t("common.fullTime") },
        { value: 1, label: t("common.partTime") },
        { value: 2, label: t("common.remotely") }
    ] as const;

    const [state, action, pending] = useActionState(expertDeleteExperienceProfileAction, {
        success: false,
        formData: new FormData()
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (state.success) {
            toast.success(t("common.changesSaved"));
            setShowModal(false);
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, t]);

    return (
        <>
            <Modal visible={showModal} onClose={() => setShowModal(false)}>
                <div className="bg-white rounded-lg p-6 lg:p-12 text-center items-center w-full max-w-xs md:max-w-sm lg:max-w-lg flex flex-col gap-8">
                    <p>{t("experts.deleteExperience")}</p>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                            disabled={pending}
                        >
                            {t("common.cancel")}
                        </Button>
                        <form action={(fd) => {
                            fd.append("id", experience.id.toString());
                            action(fd);
                        }}>
                            <Button type="submit" disabled={pending}>
                                {t("common.confirm")}
                            </Button>
                        </form>
                    </div>
                </div>
            </Modal>
            <article className="flex gap-6">
                <div className="flex flex-col gap-4 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary-main"></span>
                    <span className="w-[2px] flex-1 h-full bg-black/5"></span>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 justify-between">
                            <h3 className="text-dark-400 font-medium">
                                {experience.job_title} · {experience.hospital_name}
                            </h3>
                            <div className="flex gap-1 items-center">
                                <Link
                                    href={`/profile/experience/${experience.id}/edit`}
                                    className="text-dark-300 transition-colors duration-200 hover:text-dark-400"
                                >
                                    <MdEdit size={20} />
                                </Link>
                                <button
                                    type="button"
                                    className="text-dark-200 transition-colors duration-200 hover:text-error-main"
                                    onClick={() => setShowModal(true)}
                                >
                                    <FaX />
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-dark-300">
                            {experience.start_date} - {experience.end_date} · {experience.city.name}
                            , {experience.city?.country?.name}
                            {experience.work_type in workTypeOptions &&
                                ` (${workTypeOptions[experience.work_type]?.label})`}
                        </p>
                    </div>
                    <p className="text-dark-400 text-sm max-w-lg">{experience.content}</p>
                </div>
            </article>
        </>
    );
}
