import { cn } from "@/utils/cn";
import DropdownButton from "./dropdown-button";
import MultiSelectMenu from "./multi-select-menu";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
    options: { label: string; value: string }[];
    className?: string;
    name?: string;
    onChange?: (value: string[]) => void;
    placeholder?: string;
    label?: string;
    containerClassName?: string;
    placeholderIcon?: React.ReactNode;
    error?: string | string[];
    disabled?: boolean;
    defaultValue?: string[];
}

export default function MultiSelect({
    options,
    className,
    name,
    onChange,
    label,
    containerClassName,
    placeholderIcon,
    placeholder,
    error,
    defaultValue = [],
    disabled
}: Props) {
    const t = useTranslations();
    const [selected, setSelected] = useState<string[]>(defaultValue);

    function handleChange(options: string[]) {
        setSelected(options);
        onChange?.(options);
    }

    return (
        <>
            <select hidden multiple name={name} defaultValue={selected} key={selected.join(",")}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <DropdownButton
                menu={
                    <MultiSelectMenu
                        options={options}
                        className={className}
                        onChange={handleChange}
                        defaultValue={selected}
                    />
                }
                className="w-full"
            >
                <div className={cn("w-full flex flex-col items-start gap-2", containerClassName)}>
                    {label && <span className="text-dark-300">{label}</span>}
                    <div className="relative w-full">
                        {placeholderIcon && (
                            <div className="absolute top-1/2 start-3 -translate-y-1/2 text-dark-300">
                                {placeholderIcon}
                            </div>
                        )}
                        <div
                            className={cn(
                                "p-3 border border-[#66666659] rounded-xl w-full transition-colors duration-200 h-[50px]",
                                placeholderIcon && "ps-10",
                                error && "border-red-500",
                                disabled && "cursor-not-allowed",
                                className
                            )}
                        >
                            <p className="text-gray-500 line-clamp-1 text-start pe-1">
                                {selected.length > 0
                                    ? selected
                                          .map((option) =>
                                              options.find((item) => item.value === option)
                                          )
                                          .map((option) => option?.label)
                                          .join(", ")
                                    : (placeholder ?? t("placeholders.selectOneOrMoreOptions"))}
                            </p>
                        </div>
                        <div className="absolute top-1/2 end-3 -translate-y-1/2 text-dark-300">
                            <FaChevronDown />
                        </div>
                    </div>
                    <div className="text-sm text-red-500">
                        {typeof error === "string"
                            ? error
                            : error?.map((e, index) => <p key={index}>{e}</p>)}
                    </div>
                </div>
            </DropdownButton>
        </>
    );
}
