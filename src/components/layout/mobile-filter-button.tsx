"use client";
import { useLocale, useTranslations } from "next-intl";
import Button from "../ui/button";
import Image from "next/image";
import icons from "@/lib/icons";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaX } from "react-icons/fa6";

export default function MobileFilterButton({ children }: { children: React.ReactNode }) {
    const t = useTranslations();
    const [modalOpen, setModalOpen] = useState(false);
    const locale = useLocale();

    return (
        <>
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 w-full h-full"
                    >
                        <motion.div
                            initial={{ x: locale === "ar" ? "100%" : "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: locale === "ar" ? "100%" : "-100%" }}
                            transition={{ duration: 0.3 }}
                            className="bg-white py-12 px-8 h-full"
                        >
                            <button onClick={() => setModalOpen(false)} className="mb-4">
                                <FaX size={20} />
                            </button>
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Button
                variant="secondary"
                className="w-max xl:hidden"
                onClick={() => setModalOpen(true)}
            >
                <Image src={icons.filters} width={20} height={20} alt="filter" />
                {t("common.filters")}
            </Button>
        </>
    );
}
