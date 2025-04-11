import MessagesLayoutClient from "./layout-client";

export default async function MessagesLayout({ children }: { children: React.ReactNode }) {
    return <MessagesLayoutClient>{children}</MessagesLayoutClient>;
}
