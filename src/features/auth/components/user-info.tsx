import Button from "@/components/ui/button";
import DropdownButton from "@/components/ui/dropdown-button";
import { Link } from "@/i18n/routing";
import { User } from "@/types/user";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CiLogout } from "react-icons/ci";

export default function UserInfo({ user }: { user: User }) {
    return (
        <div>
            <DropdownButton menu={<UserInfoMenu user={user} />}>
                <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />
            </DropdownButton>
        </div>
    );
}

export function UserInfoMenu({ user }: { user: User }) {
    const t = useTranslations();

    return (
        <div className="p-4 rounded-lg shadow-lg bg-white flex flex-col gap-2">
            <Link href={`/experts/${user.id}`} className="w-full">
                <Button variant="secondary" className="w-full">{t("common.myProfile")}</Button>
            </Link>
            <Link href="/logout">
                <Button color="danger">
                    <CiLogout />
                    {t("auth.logout")}
                </Button>
            </Link>
        </div>
    );
}
