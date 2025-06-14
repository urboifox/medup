import Image from "next/image";
import { User, UserType } from "@/types/user";
import { useTranslations } from "next-intl";

export default function UserBaseInfo({ user }: { user: User }) {
    const t = useTranslations();

    const typesMap: Record<UserType, string> = {
        "1": t("common.expert"),
        "2": t("common.trainee"),
        "3": t("common.student"),
        "4": t("common.researcher")
    };

    return (
        <div className="flex items-center gap-6 flex-col md:flex-row">
            <div className="relative">
                <Image
                    src={user.avatar}
                    alt={user.name}
                    width={360}
                    height={360}
                    className="rounded-3xl object-cover aspect-square"
                />
                <div className="flex items-center gap-2 absolute start-4 bottom-4">
                    {user?.type && (
                        <div className="flex items-center gap-2 text-sm text-primary-main bg-white px-2 py-1 rounded-md">
                            <span>{typesMap[user?.type]}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <h3 className="lg:text-xl font-semibold line-clamp-2" title={user.name}>
                    {user.name}
                </h3>
            </div>
        </div>
    );
}
