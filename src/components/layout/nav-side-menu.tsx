"use client";

import { AnimatePresence, motion } from "motion/react";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

type NavItem = {
    label: string;
    href: string;
};

export default function NavSideMenu({ navItems }: { navItems: NavItem[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
                <FiMenu />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 w-full h-full z-50 bg-black/50 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.3 }}
                            className="h-full bg-white w-80 flex flex-col py-10 px-4 gap-10"
                        >
                            <button className="text-2xl">
                                <GrClose />
                            </button>
                            <ul className="flex flex-col gap-6 text-lg capitalize text-dark-300">
                                {navItems.map((item, idx) => {
                                    return (
                                        <li key={idx}>
                                            <Link
                                                href={item.href}
                                                className="transition-colors duration-100 hover:text-dark-400"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
