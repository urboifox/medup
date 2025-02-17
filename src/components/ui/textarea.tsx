"use client";
import { cn } from "@/utils/cn";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    className?: string;
    containerClassName?: string;
    placeholderIcon?: React.ReactNode;
    error?: string | string[];
}

export default function Textarea({
    label,
    className,
    placeholderIcon,
    containerClassName,
    error,
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
                <textarea
                    className={cn(
                        "focus:outline-none p-3 border border-[#66666659] rounded-xl w-full focus:border-primary-main transition-colors duration-200",
                        placeholderIcon && "ps-10",
                        error && "border-red-500",
                        rest?.disabled && "cursor-not-allowed",
                        className
                    )}
                    {...rest}
                ></textarea>
            </div>
            <div className="text-sm text-red-500">
                {typeof error === "string"
                    ? error
                    : error?.map((e, index) => <p key={index}>{e}</p>)}
            </div>
        </label>
    );
}
