export type AppNotification = {
    id: string;
    title: string;
    created_at: string;
    seen: boolean;
    body: string;
    data: { type: string; model_id: number };
};
