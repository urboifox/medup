import { cn } from "@/utils/cn";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    containerClassName?: string;
    placeholderIcon?: React.ReactNode;
}

export default function Input({
    label,
    className,
    placeholderIcon,
    containerClassName,
    ...rest
}: Props) {
    return (
        <div className={cn("flex flex-col gap-2", containerClassName)}>
            {label && <label className="text-dark-300">{label}</label>}
            <div className="relative">
                {placeholderIcon && (
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 text-dark-300">
                        {placeholderIcon}
                    </div>
                )}
                <input
                    className={cn(
                        "focus:outline-none p-3 border border-[#66666659] rounded-xl",
                        placeholderIcon && "pl-10",
                        className
                    )}
                    type={rest?.type ?? "text"}
                    {...rest}
                />
            </div>
        </div>
    );
}
