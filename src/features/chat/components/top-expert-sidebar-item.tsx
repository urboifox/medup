import { Expert } from "@/features/experts/types";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function TopExpertSidebarItem({ expert }: { expert: Expert }) {
    return (
        <Link
            href={`/experts/${expert.id}`}
            className="flex flex-start gap-2 p-4 rounded-md w-full transition-colors duration-100 hover:bg-light-200"
        >
            <Image
                src={expert.user.avatar}
                alt={expert.user.name}
                width={48}
                height={48}
                className="rounded-xl object-cover h-[48px] w-[48px]"
            />
            <div className="flex flex-col gap-1 w-full">
                <h5 className="font-semibold line-clamp-1 break-all" title={"Mohamed Fox"}>
                    {expert.user.name}
                </h5>
                <p className="line-clamp-1 text-sm text-dark-300">{expert.speciality.name}</p>
            </div>
        </Link>
    );
}
