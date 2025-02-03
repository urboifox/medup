"use client";
import { cn } from "@/utils/cn";

type CheckboxProps = {
    label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox({ label, ...rest }: CheckboxProps) {
    return (
        <label className="flex items-center cursor-pointer">
            <input type="checkbox" className={cn("invisible peer", rest.className)} {...rest} />
            <span className="transition-colors duration-100 after:transition-colors after:duration-100 w-5 h-5 aspect-square rounded-sm peer-checked:border-primary-main border border-light-400 relative after:content-[''] after:w-3 after:h-3 after:bg-transparent after:absolute after:left-1/2 after:top-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 peer-checked:after:bg-primary-main" />
            <span className="select-none ms-2 text-sm font-medium w-max max-w-full">{label}</span>
        </label>
    );
}
