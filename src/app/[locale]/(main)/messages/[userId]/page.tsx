import Button from "@/components/ui/button";
import { getMessages, getUserConversation } from "@/features/chat/services";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import ChatPageClient from "./page-client";
import { redirect } from "next/navigation";

export default async function ChatPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    const { data: conversation } = await getUserConversation(userId);
    const { data: messages } = await getMessages(conversation?.id as string);

    if (!conversation) {
        return redirect("/messages");
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <header className="rounded-lg p-4 border-b border-light-300 flex gap-4 lg:items-center justify-between flex-col lg:flex-row">
                <Link className={"flex flex-start gap-2"} href="/experts/1">
                    <Image
                        src={conversation?.other_user.avatar as string}
                        alt={conversation?.other_user.name as string}
                        width={48}
                        height={48}
                        className="rounded-xl object-cover h-[48px] w-[48px]"
                    />
                    <div className="flex flex-col gap-1 w-full">
                        <h5 className="font-semibold line-clamp-1 break-all" title={"Mohamed Fox"}>
                            {conversation?.other_user.name as string}j
                        </h5>
                        <p className="line-clamp-1 text-sm text-dark-300 font-medium">
                            Egypt, Alexandria
                        </p>
                    </div>
                </Link>
                <Button size="sm">Open Digital Contract</Button>
            </header>

            <ChatPageClient messages={messages || []} conversation={conversation} />
        </div>
    );
}
