import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Checkbox from "./checkbox";

interface Props {
    options: { label: string; value: string }[];
    className?: string;
    onChange?: (value: string[]) => void;
    defaultValue?: string[];
}

export default function MultiSelectMenu({
    options,
    className,
    onChange,
    defaultValue = []
}: Props) {
    const t = useTranslations();

    const [searchValue, setSearchValue] = useState("");

    const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultValue);

    const handleCheckboxChange = (option: string) => {
        let newSelectedOptions = [...selectedOptions];
        if (newSelectedOptions.includes(option)) {
            newSelectedOptions = newSelectedOptions.filter((item) => item !== option);
        } else {
            newSelectedOptions.push(option);
        }
        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
    };

    const filteredOptions = searchValue
        ? options.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
        : options;

    return (
        <div className="py-4 px-2 bg-white rounded-lg shadow-lg flex flex-col gap-4">
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={cn("focus:outline-none w-full h-full p-2 pb-0", className)}
                placeholder={t("common.search")}
            />
            <hr />
            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto">
                {filteredOptions?.map((option, idx) => {
                    return (
                        <label key={idx} className="flex items-center cursor-pointer">
                            <Checkbox
                                checked={selectedOptions.includes(option.value)}
                                onChange={() => handleCheckboxChange(option.value)}
                            />
                            <span>{option?.label}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
