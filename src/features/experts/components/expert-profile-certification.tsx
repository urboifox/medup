import Button from "@/components/ui/button";
import { ExpertCertification } from "../types";
import { useTranslations } from "next-intl";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ExpertProfileCertification({
    certification
}: {
    certification: ExpertCertification;
}) {
    const t = useTranslations();

    return (
        <div className="flex flex-col gap-4 items-center text-center">
            <embed
                src={`${certification.file}#toolbar=0`}
                type="application/pdf"
                width="100%"
                height="100%"
                className="w-full aspect-video"
            />
            <p>
                <span className="font-medium">{certification.name}</span> ·{" "}
                <span className="text-dark-300 text-sm">{certification.date}</span>
            </p>
            <a href={certification.file} target="_blank" rel="noopener noreferrer">
                <Button>
                    <FaExternalLinkAlt strokeWidth={0.3} size={16} />
                    {t("common.view")}
                </Button>
            </a>
        </div>
    );
}
