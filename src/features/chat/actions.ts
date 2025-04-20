"use server";

import { FetcherError } from "@/lib/exceptions";
import { fetcher } from "@/utils/fetcher";
import { getTranslations } from "next-intl/server";
import { ChatMessage, Conversation } from "./types";

type SendMessageAction =
    | {
          success: true;
          newMessage: ChatMessage;
          formData: FormData;
      }
    | {
          success: false;
          formData: FormData;
          errors?: any;
          message?: string;
      };

export async function sendMessageAction(
    _prevData: SendMessageAction,
    formData: FormData
): Promise<SendMessageAction> {
    const t = await getTranslations();
    const conversationId = formData.get("conversation_id");

    let newMessage: ChatMessage;
    try {
        const { data: message } = await fetcher<ChatMessage>(
            `/api/conversations/${conversationId}/messages`,
            {
                method: "POST",
                body: formData,
                skipHeaders: true
            }
        );
        newMessage = message as ChatMessage;
    } catch (error) {
        if (error instanceof FetcherError) {
            console.error("error:", error.data);
            return {
                success: false,
                formData,
                errors: error.data?.data,
                message: error.data?.message
            };
        }
        return { success: false, formData, message: t("errors.somethingWentWrong") };
    }

    return { success: true, newMessage: newMessage, formData };
}

type CreateConversationAction =
    | {
          success: true;
      }
    | {
          success: false;
          message?: string;
      };

export async function createConversationAction(
    _prevData: CreateConversationAction,
    formData: FormData
): Promise<CreateConversationAction> {
    const t = await getTranslations();
    const userId = formData.get("expert_id");

    try {
        const { data: conversation } = await fetcher<Conversation>(
            `/api/conversations/for?user_id=${userId}`
        );
        if (!conversation) {
            const { data: newConversation } = await fetcher<Conversation>("/api/conversations", {
                method: "POST",
                body: JSON.stringify({
                    type: "0",
                    user_id: userId
                })
            });
            if (!newConversation) {
                return { success: false, message: t("errors.somethingWentWrong") };
            }
        }
    } catch (error) {
        if (error instanceof FetcherError) {
            console.error("error:", error.data);
            return {
                success: false,
                message: error.data?.message
            };
        }
        return { success: false, message: t("errors.somethingWentWrong") };
    }

    return { success: true };
}
