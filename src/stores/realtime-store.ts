import Pusher from "pusher-js";
import { create } from "zustand";

interface RealtimeStore {
    client: Pusher | null;
    setClient: (client: Pusher) => void;
}

export const useRealtimeStore = create<RealtimeStore>()((set) => ({
    client: null,
    setClient: (client: any) => {
        set({ client });
    }
}));
