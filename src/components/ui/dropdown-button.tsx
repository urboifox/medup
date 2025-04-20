"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    menu: React.ReactNode;
    closeOnMenuClick?: boolean;
    containerClassName?: string;
    activeClassName?: string;
}

export default function DropdownButton({
    children,
    menu,
    onClick,
    containerClassName,
    activeClassName,
    ...rest
}: Props) {
    const [visible, setVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setVisible(false);
    }, [pathname]);

    const containerRef = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref: containerRef,
        handler: () => setVisible(false)
    });

    return (
        <div className={cn("relative", containerClassName)} ref={containerRef}>
            <div
                role="button"
                {...rest}
                className={cn(
                    "transition-colors duration-100",
                    rest.className,
                    visible ? activeClassName : ""
                )}
                onClick={(e) => {
                    setVisible(!visible);
                    onClick?.(e);
                }}
            >
                {children}
            </div>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full ltr:right-0 rtl:left-0 z-10 w-full min-w-fit"
                    >
                        {menu}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
