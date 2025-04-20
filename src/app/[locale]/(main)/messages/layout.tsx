import TopExpertsSidebar from "@/features/chat/components/top-experts-sidebar";
import { getConversations } from "@/features/chat/services";
import MessagesLayoutClient from "./layout-client";
import MessagesSidebar from "@/features/chat/components/messages-sidebar";
import { getAllExperts } from "@/features/experts/services";

export default async function MessagesLayout({ children }: { children: React.ReactNode }) {
    const { data: conversations } = await getConversations();
    const { data: experts } = await getAllExperts({
        // params: { only_top: "1" }
    });

    return (
        <div className="h-calc(100dvh-96px-80px) py-10 container">
            <MessagesLayoutClient conversations={conversations || []}>
                {children}
            </MessagesLayoutClient>
            <div className="grid grid-cols-12 max-xl:hidden">
                <aside className="col-span-3">
                    <MessagesSidebar />
                </aside>
                <main className="col-span-6 px-4">{children}</main>
                <aside className="col-span-3">
                    <TopExpertsSidebar experts={experts || []} />
                </aside>
            </div>
        </div>
    );
}
