import { Link } from "@/i18n/routing";
import { MdEdit } from "react-icons/md";

export default function InfoCardWrapper({
    children,
    label,
    editUrl
}: {
    children?: React.ReactNode;
    label?: string;
    editUrl?: string;
}) {
    return (
        <div className="p-6 rounded-lg border-2 border-info-50 flex flex-col gap-6">
            <div className="flex justify-between items-center gap-2">
                <h3 className="font-semibold text-xl">{label}</h3>
                {editUrl && (
                    <Link
                        href={editUrl}
                        className="text-dark-300 transition-colors duration-200 hover:text-dark-400"
                    >
                        <MdEdit size={20} />
                    </Link>
                )}
            </div>
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    );
}
