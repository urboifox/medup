"use client";
import { cn } from "@/utils/cn";
import { FaChevronDown } from "react-icons/fa6";

interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    className?: string;
    containerClassName?: string;
    placeholderIcon?: React.ReactNode;
    error?: string | string[];
    children: React.ReactNode;
}

export default function Select({
    label,
    className,
    placeholderIcon,
    containerClassName,
    error,
    type,
    children,
    ...rest
}: Props) {
    return (
        <label className={cn("w-full flex flex-col gap-2", containerClassName)}>
            {label && <span className="text-dark-300">{label}</span>}
            <div className="relative">
                {placeholderIcon && (
                    <div className="absolute top-1/2 start-3 -translate-y-1/2 text-dark-300">
                        {placeholderIcon}
                    </div>
                )}
                <select
                    className={cn(
                        "focus:outline-none bg-transparent p-3 border border-[#66666659] rounded-xl w-full [&:not(:disabled)]:active:border-primary-main appearance-none transition-colors duration-200",
                        placeholderIcon && "ps-10",
                        error && "border-red-500",
                        rest?.disabled && "cursor-not-allowed",
                        className
                    )}
                    {...rest}
                >
                    {children}
                </select>
                <div className="absolute top-1/2 right-3 -translate-y-1/2 text-dark-300">
                    <FaChevronDown />
                </div>
            </div>
            <div className="text-sm text-red-500">
                {typeof error === "string"
                    ? error
                    : error?.map((e, index) => <p key={index}>{e}</p>)}
            </div>
        </label>
    );
}
