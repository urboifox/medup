"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    menu: React.ReactNode;
    closeOnMenuClick?: boolean;
}

export default function DropdownButton({ children, menu, onClick, ...rest }: Props) {
    const [visible, setVisible] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref: containerRef,
        handler: () => setVisible(false)
    });

    return (
        <div className="relative" ref={containerRef}>
            <button
                {...rest}
                onClick={(e) => {
                    setVisible(!visible);
                    onClick?.(e);
                }}
            >
                {children}
            </button>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full ltr:right-0 rtl:left-0 z-10"
                    >
                        {menu}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
