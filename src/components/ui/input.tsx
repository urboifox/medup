"use client";
import { cn } from "@/utils/cn";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    containerClassName?: string;
    placeholderIcon?: React.ReactNode;
    error?: string | string[];
}

export default function Input({
    label,
    className,
    placeholderIcon,
    containerClassName,
    error,
    ...rest
}: Props) {
    return (
        <div className={cn("w-full flex flex-col gap-2", containerClassName)}>
            {label && <label className="text-dark-300">{label}</label>}
            <div className="relative">
                {placeholderIcon && (
                    <div className="absolute top-1/2 start-3 -translate-y-1/2 text-dark-300">
                        {placeholderIcon}
                    </div>
                )}
                <input
                    className={cn(
                        "focus:outline-none p-3 border border-[#66666659] rounded-xl",
                        placeholderIcon && "ps-10",
                        error && "border-red-500",
                        className
                    )}
                    type={rest?.type ?? "text"}
                    {...rest}
                />
            </div>
            <div className="text-sm text-red-500">
                {typeof error === "string"
                    ? error
                    : error?.map((e, index) => <p key={index}>{e}</p>)}
            </div>
        </div>
    );
}
