import Input from "@/components/ui/input";
import Image from "next/image";
import { startTransition, useActionState, useEffect, useState } from "react";
import { RiAttachmentLine } from "react-icons/ri";
import { sendMessageAction } from "../actions";
import { Chat, ChatMessageType } from "../types";
import { useChatStore } from "../store";
import { useAuthStore } from "@/features/auth/store";
import { User } from "@/types/user";

export default function ChatForm({
    scrollToChatEnd,
    conversation
}: {
    scrollToChatEnd: () => void;
    conversation: Chat;
}) {
    const [state, action] = useActionState(sendMessageAction, {
        success: false,
        formData: new FormData()
    });
    const user = useAuthStore((state) => state.user);
    const [message, setMessage] = useState("");
    const addMessage = useChatStore((state) => state.addMessage);
    const replaceMessage = useChatStore((state) => state.replaceMessage);
    const updateOrAddConversation = useChatStore((state) => state.updateOrAddChat);

    useEffect(() => {
        if (state.success) {
            replaceMessage(state.formData.get("temp_id") as string, state.newMessage);
        }
    }, [state, addMessage]);

    return (
        <form
            className="flex items-center gap-3 w-full"
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const tempId = new Date().getTime().toString();
                const content = formData.get("content") as string;
                if (!content.trim()) return;
                const newMessage = {
                    content,
                    created_at: new Date().toISOString(),
                    user: user as User,
                    seen: false,
                    pending: true,
                    id: tempId
                };
                addMessage(newMessage);
                updateOrAddConversation({
                    ...conversation,
                    latest_message: newMessage
                });
                setMessage("");
                formData.set("type", ChatMessageType.Text.toString());
                formData.set("temp_id", tempId);
                formData.set("conversation_id", conversation.id);
                setTimeout(() => {
                    scrollToChatEnd();
                });
                startTransition(() => action(formData));
            }}
        >
            <button className="transition-colors duration-200 hover:text-primary-main">
                <RiAttachmentLine size={24} />
            </button>
            <div className="relative w-full">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    autoComplete="off"
                    name="content"
                    placeholder="Type a message"
                    className="pe-10"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-dark-300 font-medium">
                    <Image src="/icons/send-arrow.svg" alt="Send" width={24} height={24} />
                </button>
            </div>
        </form>
    );
}
