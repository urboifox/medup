"use client";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

export default function Modal({
    children,
    visible,
    onClose
}: {
    children: React.ReactNode;
    visible: boolean;
    onClose?: () => void;
}) {
    return createPortal(
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 w-full h-full flex items-center justify-center"
                >
                    <div
                        className="absolute inset-0 w-full h-full bg-black/20 backdrop-filter-[blur(5px)]"
                        onClick={onClose}
                    />
                    <div className="w-full z-50 flex items-center justify-center">{children}</div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
