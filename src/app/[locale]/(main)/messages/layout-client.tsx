"use client";

import Input from "@/components/ui/input";
import ChatSidebarItem from "@/features/chat/components/chat-sidebar-item";
import TopExpertSidebarItem from "@/features/chat/components/top-expert-sidebar-item";
import { Expert } from "@/features/experts/types";
import { Link } from "@/i18n/routing";
import icons from "@/lib/icons";
import { useParams } from "next/navigation";
import { AiOutlineWarning } from "react-icons/ai";

export default function MessagesLayoutClient({ children }: { children: React.ReactNode }) {
    const { chatId } = useParams();

    const messages = Array(12).fill(null);

    const topExperts = Array(5).fill(null);

    return (
        <div className="h-calc(100dvh-96px-80px) py-10 container">
            <div className="xl:hidden">
                {chatId ? children : <MessagesSidebar messages={messages} />}
            </div>
            <div className="grid grid-cols-12 max-xl:hidden">
                <aside className="col-span-3">
                    <MessagesSidebar messages={messages} />
                </aside>
                <main className="col-span-6 px-4">{children}</main>
                <aside className="col-span-3">
                    <TopExpertsSidebar topExperts={topExperts} />
                </aside>
            </div>
        </div>
    );
}

export function MessagesSidebar({ messages }: { messages: any[] }) {
    return (
        <div className="flex flex-col gap-4 border-e border-light-300">
            <h3 className="text-xl font-semibold flex items-center gap-2">
                Your Messages
                <span className="rounded-full px-3 py-1 text-foreground-main text-sm bg-light-200 font-semibold">
                    12
                </span>
            </h3>
            <hr />

            <div className="flex flex-col gap-2">
                <div className="pe-4">
                    <Input placeholder="Search messages or experts" />
                </div>
                <ul className="flex flex-col pe-2 overflow-y-auto h-[calc(100vh-200px)]">
                    {messages.map((expert, index) => {
                        const isActive = index === 1;
                        return (
                            <li key={index}>
                                <ChatSidebarItem expert={expert} isActive={isActive} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export function TopExpertsSidebar({ topExperts }: { topExperts: Expert[] }) {
    return (
        <div className="flex flex-col gap-4 border-s border-light-300 h-full">
            <h3 className="text-xl font-semibold flex items-center gap-2 ps-4">Explore</h3>
            <hr />
            <div className="flex flex-col gap-2 ps-4">
                <h4 className="font-semibold">Top Experts</h4>
                <ul className="flex flex-col gap-2">
                    {topExperts.map((expert, index) => {
                        return (
                            <li key={index}>
                                <TopExpertSidebarItem expert={expert} />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <hr />
            <div className="flex flex-col gap-2 ps-4 [&_a]:text-primary-main [&_a]:font-semibold text-dark-300 text-sm">
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
                    الشروط الاستخدام ويعرض الحساب للحجب
                </p>
            </div>
        </div>
    );
}
