import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FaX } from "react-icons/fa6";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    containerClassName?: string;
    placeholderIcon?: React.ReactNode;
    error?: string | string[];
    defaultFiles?: File[];
    onFilesChange?: (files: File[]) => void;
    clearFilesOnCancel?: boolean;
}

export default function FileInput({
    label,
    className,
    placeholderIcon,
    containerClassName,
    error,
    multiple,
    onChange,
    onFilesChange,
    clearFilesOnCancel = false,
    defaultFiles = [],
    ...rest
}: Props) {
    const t = useTranslations();
    const [files, setFiles] = useState<File[]>(defaultFiles);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputFiles = Array.from(e.target.files || []);
        if (clearFilesOnCancel && inputFiles.length === 0) {
            setFiles([]);
            onFilesChange?.([]);
            return;
        }
        const newFiles = multiple
            ? [...files, ...inputFiles]
            : inputFiles.length === 0
              ? files
              : inputFiles;
        setFiles(newFiles);
        onFilesChange?.(newFiles);
        onChange?.(e);
    }

    function removeFile(index: number) {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        onFilesChange?.(newFiles);
    }

    return (
        <div className={cn("w-full flex flex-col gap-2", containerClassName)}>
            {label && <span className="text-dark-300">{label}</span>}
            <label
                className={cn(
                    "relative cursor-pointer focus:outline-none p-3 border border-[#66666659] rounded-xl w-full focus:border-primary-main transition-colors duration-200",
                    placeholderIcon && "ps-10",
                    error && "border-red-500",
                    rest?.disabled && "cursor-not-allowed",
                    className
                )}
            >
                {placeholderIcon && (
                    <div className="absolute top-1/2 start-3 -translate-y-1/2 text-dark-300">
                        {placeholderIcon}
                    </div>
                )}
                <p className="text-gray-500 line-clamp-1">
                    {files.length > 0
                        ? `${files.length} ${t("placeholders.filesSelected")}`
                        : multiple
                          ? t("placeholders.selectOneOrMoreFiles")
                          : t("placeholders.selectFile")}
                </p>
                <input
                    onChange={handleChange}
                    className="hidden"
                    type="file"
                    multiple={multiple}
                    {...rest}
                />
            </label>

            {files.length > 0 && (
                <div className="flex flex-col gap-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 p-2 bg-gray-100 rounded-lg border-dashed border border-primary-main transition-colors duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-700 line-clamp-1">{file.name}</p>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => removeFile(index)}
                                >
                                    <FaX size={16} />
                                </button>
                            </div>
                            {file.type.includes("image") && (
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={file.name || "File"}
                                    height={100}
                                    width={100}
                                    className="rounded-lg object-cover w-full h-64"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="text-sm text-red-500">
                    {typeof error === "string"
                        ? error
                        : error?.map((e, index) => <p key={index}>{e}</p>)}
                </div>
            )}
        </div>
    );
}
