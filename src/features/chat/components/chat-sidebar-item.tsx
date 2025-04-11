import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import moment from "moment";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function ChatSidebarItem({ expert, isActive }: { expert: any; isActive: boolean }) {
    const locale = useLocale();

    return (
        <Link
            href="/messages/1"
            className={cn(
                "flex flex-start gap-2 p-4 rounded-md w-full transition-colors duration-100",
                isActive ? "bg-light-300" : "hover:bg-light-200"
            )}
        >
            <Image
                src="https://medup.mohamed-emad.com/storage/default/user.png"
                alt="User"
                width={48}
                height={48}
                className="rounded-xl object-cover h-[48px] w-[48px]"
            />
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between gap-1 w-full">
                    <h5 className="font-semibold line-clamp-1 break-all" title={"Mohamed Fox"}>
                        Mohamed Fox
                    </h5>
                    <span className="text-xs text-dark-300 font-medium shrink-0">
                        {moment(Date.now()).locale(locale).fromNow()}
                    </span>
                </div>
                <p className="line-clamp-1 text-sm text-dark-300">
                    Hello, how are you? I was wondering if you could help me with my research.
                </p>
            </div>
        </Link>
    );
}
