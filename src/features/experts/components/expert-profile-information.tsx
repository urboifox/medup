import { useLocale, useTranslations } from "next-intl";
import { Expert } from "../types";
import { LuCalendar, LuMapPin } from "react-icons/lu";
import { PiSuitcaseSimple } from "react-icons/pi";
import moment from "moment";

export default function ExpertProfileInformation({ expert }: { expert: Expert }) {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <div className="grid grid-cols-3 gap-4">
            <InfoItem
                icon={<LuMapPin size={32} />}
                label={t("labels.location")}
                value={expert.city.name}
            />
            <InfoItem
                icon={<PiSuitcaseSimple size={32} />}
                label={t("labels.experience")}
                value={`${expert.experience_years || 0} ${t("common.years")}`}
            />
            <InfoItem
                icon={<LuCalendar size={32} />}
                label={t("labels.dateJoined")}
                value={moment(expert.user.created_at).locale(locale).format("LL")}
            />
        </div>
    );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex flex-col gap-4">
            <span className="text-primary-main">{icon}</span>
            <div className="flex flex-col gap-1">
                <span className="uppercase text-xs text-dark-200">{label}</span>
                <span className="text-sm font-semibold text-dark-300">{value}</span>
            </div>
        </div>
    );
}
