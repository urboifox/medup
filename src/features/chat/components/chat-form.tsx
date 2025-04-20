import Input from "@/components/ui/input";
import Image from "next/image";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { RiAttachmentLine, RiCloseCircleFill } from "react-icons/ri";
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
    const fileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const user = useAuthStore((state) => state.user);
    const [message, setMessage] = useState("");
    const addMessage = useChatStore((state) => state.addMessage);
    const replaceMessage = useChatStore((state) => state.replaceMessage);
    const updateOrAddConversation = useChatStore((state) => state.updateOrAddChat);

    useEffect(() => {
        if (state.success) {
            replaceMessage(state.formData.get("temp_id") as string, state.newMessage);
        }
    }, [state, replaceMessage]);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        setFile(file || null);
    }

    return (
        <div>
            {file && (
                <div className="p-3 rounded-xl mb-2 text-primary-main bg-primary-50 flex items-center justify-between gap-4">
                    {file.name}
                    <button
                        onClick={() => {
                            setFile(null);
                            if (fileRef.current) {
                                fileRef.current.value = "";
                            }
                        }}
                    >
                        <RiCloseCircleFill size={24} />
                    </button>
                </div>
            )}

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
                        media: file ? URL.createObjectURL(file) : undefined,
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
                    formData.set(
                        "type",
                        file ? ChatMessageType.Document.toString() : ChatMessageType.Text.toString()
                    );
                    formData.set("temp_id", tempId);
                    formData.set("conversation_id", conversation.id);
                    if (file) {
                        formData.set("media", file);
                    }
                    setFile(null);
                    if (fileRef.current) {
                        fileRef.current.value = "";
                    }
                    setTimeout(() => {
                        scrollToChatEnd();
                    });
                    startTransition(() => action(formData));
                }}
            >
                <label className="transition-colors duration-200 hover:text-primary-main cursor-pointer">
                    <input
                        ref={fileRef}
                        type="file"
                        name="media"
                        hidden
                        onChange={handleFileChange}
                    />
                    <RiAttachmentLine size={24} />
                </label>
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
        </div>
    );
}
