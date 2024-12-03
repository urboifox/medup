import { cn } from "@/utils/cn";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary";
}

export default function Button({ size = "md", variant = "primary", children, ...rest }: Props) {
    const baseStyles =
        "transition-colors duration-200 rounded-md flex items-center justify-center gap-2 font-semibold disabled:opacity-50";

    const variantStyles = {
        primary:
            "bg-primary-main text-white lg:hover:bg-primary-100 lg:active:bg-primary-200 active:bg-primary-100",
        secondary:
            "bg-light-200 text-dark-400 lg:hover:bg-light-300 lg:active:bg-light-400 active:bg-light-300"
    };

    const sizeStyles = {
        sm: "px-6 py-3 text-sm",
        md: "px-8 py-[14px] text-base",
        lg: "px-12 py-4 text-lg"
    };

    return (
        <button
            {...rest}
            className={cn(baseStyles, variantStyles[variant], sizeStyles[size], rest?.className)}
        >
            {children}
        </button>
    );
}
