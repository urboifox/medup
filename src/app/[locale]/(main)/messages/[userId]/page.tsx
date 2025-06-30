import { getMessages, getUserConversation } from "@/features/chat/services";
import Image from "next/image";
import ChatPageClient from "./page-client";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/routing";
import { AiOutlineWarning } from "react-icons/ai";
import ContractButton from "./contract-button";

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
                <div className={"flex flex-start gap-2 items-center"}>
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
                        <p className="line-clamp-1 text-sm text-dark-300 font-medium"></p>
                    </div>
                </div>
                <ContractButton
                    contractId={conversation?.contract_id}
                    otherUserId={conversation?.other_user.id}
                    traineeEmail={conversation?.other_user.email}
                    traineeName={conversation?.other_user.name}
                />
            </header>

            <ChatPageClient messages={messages || []} conversation={conversation} />

            <div className="flex flex-col gap-2 ps-4 [&_a]:text-primary-main [&_a]:font-semibold text-dark-300 text-sm lg:hidden">
                <AiOutlineWarning className="text-warning-main h-fit" size={20} />
                <p>
                    For the safety and security of our" members, all buying and selling must take
                    place on the <Link href="/">Medupskills.com</Link> platform. Any transactions
                    outside of the platform are against our terms of service and may lead to account
                    restrictions The platform reserves the right to take legal action against any
                    violators
                </p>
                <p>
                    لحماية جميع الأعضاء، يقتصر التعامل التجاري على منصة{" "}
                    <Link href="/">Medupskills.com</Link> فقط. أي تعامل خارج المنصة بعد مخالفة
                    الشروط الاستخدام ويعرض الحساب للحجب تحتفظ المنصة بحق اتخاذ الإجراءات القانونية
                    ضد أي مخالفين
                </p>
            </div>
        </div>
    );
}
