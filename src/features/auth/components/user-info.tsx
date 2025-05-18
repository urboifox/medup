import Button from "@/components/ui/button";
import DropdownButton from "@/components/ui/dropdown-button";
import { Link } from "@/i18n/routing";
import { User, UserType } from "@/types/user";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CiLogout } from "react-icons/ci";
import { useAuthStore } from "../store";

export default function UserInfo({ user }: { user: User }) {
    return (
        <div>
            <DropdownButton menu={<UserInfoMenu />}>
                <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover aspect-square"
                />
            </DropdownButton>
        </div>
    );
}

export function UserInfoMenu() {
    const t = useTranslations();
    const user = useAuthStore((state) => state.user);

    return (
        <div className="p-4 rounded-lg shadow-lg bg-white flex flex-col gap-2">
            <Link
                href={
                    [UserType.Expert, UserType.Researcher].includes(user?.type as any)
                        ? "/profile"
                        : "/profile/student"
                }
                className="w-full"
            >
                <Button variant="secondary" className="w-full">
                    {t("common.myProfile")}
                </Button>
            </Link>
            {/* <Link href="/messages" className="w-full"> */}
            {/*     <Button variant="secondary" className="w-full"> */}
            {/*         <CiChat1 /> */}
            {/*         {t("common.messages")} */}
            {/*     </Button> */}
            {/* </Link> */}
            <Link href="/logout" className="w-full">
                <Button color="danger" className="w-full">
                    <CiLogout />
                    {t("auth.logout")}
                </Button>
            </Link>
        </div>
    );
}
