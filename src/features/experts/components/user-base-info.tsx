import Image from "next/image";
import { User } from "@/types/user";

export default function UserBaseInfo({ user }: { user: User }) {
    return (
        <div className="flex items-center gap-6 flex-col md:flex-row">
            <Image
                src={user.avatar}
                alt={user.name}
                width={460}
                height={460}
                className="rounded-3xl object-cover aspect-square"
            />
            <div className="flex flex-col gap-6">
                <h3 className="lg:text-xl font-semibold line-clamp-2" title={user.name}>
                    {user.name}
                </h3>
            </div>
        </div>
    );
}
