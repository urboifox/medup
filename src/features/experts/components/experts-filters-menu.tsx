import Checkbox from "@/components/ui/checkbox";
import useQueryString from "@/hooks/useQueryString";
import { BaseEntity } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function ExpertsFiltersMenu({
    options,
    queryName
}: {
    options: BaseEntity[];
    queryName: string;
}) {
    const t = useTranslations();
    const { createQueryString, removeQueryString, getQueryString } = useQueryString();

    const [searchValue, setSearchValue] = useState("");

    const initialOptions = getQueryString(queryName);
    const [selectedOptions, setSelectedOptions] = useState<number[]>(
        initialOptions ? initialOptions.split(",").map((item) => parseInt(item)) : []
    );

    const handleCheckboxChange = (option: number) => {
        setSelectedOptions((prev) => {
            if (prev.includes(option)) {
                return prev.filter((item) => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    useEffect(() => {
        if (selectedOptions.length > 0) {
            createQueryString(queryName, selectedOptions.join(","));
        } else {
            removeQueryString(queryName);
        }
    }, [selectedOptions, queryName, createQueryString, removeQueryString]);

    const filteredOptions = searchValue
        ? options.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        : options;

    return (
        <div className="py-4 px-2 bg-white rounded-md shadow-lg flex flex-col gap-4 max-h-80 overflow-y-auto">
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="focus:outline-none w-full h-full p-2 pb-0"
                placeholder={t("common.search")}
            />
            <hr />
            {filteredOptions?.map((option, idx) => {
                return (
                    <div key={idx}>
                        <Checkbox
                            label={option.name}
                            checked={selectedOptions.includes(option.id)}
                            onChange={() => handleCheckboxChange(option.id)}
                        />
                    </div>
                );
            })}
        </div>
    );
}
