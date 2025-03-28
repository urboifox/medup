"use client";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import { BsStar } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { upgradeToPremiumAction } from "../actions";
import { toast } from "sonner";
import { BiSupport } from "react-icons/bi";
import { BsPercent } from "react-icons/bs";
import { IoSearchOutline, IoStarOutline, IoTimerOutline } from "react-icons/io5";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { PiChatsCircle } from "react-icons/pi";
import { FaX } from "react-icons/fa6";

export default function UpgradeToPremiumButton({ price = 0.0 }: { price: number }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [upgraded, setUpgraded] = useState(false);
    const t = useTranslations();

    const [state, action, pending] = useActionState(upgradeToPremiumAction, null);

    useEffect(() => {
        if (state?.success) {
            setUpgraded(true);
            if (state.message) {
                toast.success(state.message);
            }
        } else if (state?.message) {
            toast.error(state.message);
        }
    }, [state]);

    const premiumFeatures = [
        {
            title: t("premium.features.1.title"),
            description: t("premium.features.1.description"),
            icon: <IoSearchOutline />
        },
        {
            title: t("premium.features.2.title"),
            description: t("premium.features.2.description"),
            icon: <IoTimerOutline />
        },
        {
            title: t("premium.features.3.title"),
            description: t("premium.features.3.description"),
            icon: <PiChatsCircle />
        },
        {
            title: t("premium.features.4.title"),
            description: t("premium.features.4.description"),
            icon: <IoStarOutline />
        },
        {
            title: t("premium.features.5.title"),
            description: t("premium.features.5.description"),
            icon: <BsPercent />
        },
        {
            title: t("premium.features.6.title"),
            description: t("premium.features.6.description"),
            icon: <BiSupport />
        },
        {
            title: t("premium.features.7.title"),
            description: t("premium.features.7.description"),
            icon: <MdOutlineWorkspacePremium />
        }
    ];

    return (
        <>
            <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <div className="p-8 rounded-2xl flex flex-col bg-white w-screen max-w-2xl gap-8 max-h-screen overflow-y-auto">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl font-semibold">{t("common.upgradeToPremium")}</h3>
                        <button onClick={() => setModalVisible(false)}>
                            <FaX />
                        </button>
                    </div>

                    {upgraded ? (
                        <div className="flex flex-col justify-center text-center gap-4">
                            <h3 className="text-2xl font-semibold">
                                {t("premium.congratulations")}
                            </h3>
                            <p>{t("premium.congratulationsDescription")}</p>
                            <Button className="w-full" onClick={() => setModalVisible(false)}>
                                {t("common.close")}
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-2">
                                {premiumFeatures.map((feature, i) => {
                                    return (
                                        <article
                                            key={i}
                                            className="flex items-center gap-4 rounded-lg p-4 bg-light-200"
                                        >
                                            <span className="text-xl">{feature.icon}</span>
                                            <div className="flex flex-col">
                                                <h4 className="text-dark-400">{feature.title}</h4>
                                                <p className="text-sm text-dark-300">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>

                            <div className="flex gap-1 justify-center items-center">
                                <h4 className="text-center text-2xl font-semibold text-primary-main">
                                    ${price.toFixed(2)}
                                </h4>
                                <p>/{t("common.month")}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-dark-300 text-center">
                                    {t("common.payConfirmDescription", {
                                        amount: price.toFixed(2)
                                    })}
                                </p>
                                <p className="text-sm text-dark-300 text-center">
                                    {t("common.cancelAnytime")}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <form action={action} className="w-full">
                                    <Button disabled={pending} type="submit" className="w-full">
                                        {t("common.payNow")}
                                    </Button>
                                </form>
                                <button className="text-sm" onClick={() => setModalVisible(false)}>
                                    {t("common.cancel")}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
            <Button onClick={() => setModalVisible(true)}>
                <BsStar className="w-5 h-5" />
                {t("common.upgradeToPremium")}
            </Button>
        </>
    );
}
