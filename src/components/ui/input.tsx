"use client";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
    type,
    ...rest
}: Props) {
    const [localType, setLocalType] = useState<typeof type>(type ?? "text");

    return (
        <label className={cn("w-full flex flex-col gap-2", containerClassName)}>
            {label && <span className="text-dark-300">{label}</span>}
            <div className="relative">
                {placeholderIcon && (
                    <div className="absolute top-1/2 start-3 -translate-y-1/2 text-dark-300">
                        {placeholderIcon}
                    </div>
                )}
                <input
                    className={cn(
                        "focus:outline-none p-3 border border-[#66666659] rounded-xl w-full focus:border-primary-main transition-colors duration-200",
                        placeholderIcon && "ps-10",
                        error && "border-red-500",
                        rest?.disabled && "cursor-not-allowed",
                        className
                    )}
                    type={localType}
                    {...rest}
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="absolute top-1/2 end-3 -translate-y-1/2 text-dark-300"
                        onClick={() => setLocalType(localType === "password" ? "text" : "password")}
                    >
                        {localType === "text" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </button>
                )}
            </div>
            {error && (
                <div className="text-sm text-red-500">
                    {typeof error === "string"
                        ? error
                        : error?.map((e, index) => <p key={index}>{e}</p>)}
                </div>
            )}
        </label>
    );
}
