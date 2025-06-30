"use client";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useMounted } from "@/hooks/useMounted";

export default function Modal({
    children,
    visible,
    onClose
}: {
    children: React.ReactNode;
    visible: boolean;
    onClose?: () => void;
}) {
    const mounted = useMounted();

    return (
        mounted &&
        createPortal(
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 w-full h-full flex items-center justify-center"
                    >
                        <div
                            className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm"
                            onClick={onClose}
                        />
                        <div className="w-full z-50 flex items-center justify-center max-h-screen">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>,
            document.body
        )
    );
}
