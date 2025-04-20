"use client";
import Pusher from "pusher-js";
import { useRealtimeStore } from "./stores/realtime-store";
import { useEffect } from "react";

export default function RealtimeProvider({ children }: { children: React.ReactNode }) {
    const setClient = useRealtimeStore((state) => state.setClient);

    useEffect(() => {
        // Pusher.logToConsole = true;
        const client = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: "eu",
            authEndpoint: "/api/broadcast"
        });
        setClient(client);
    }, []);

    return children;
}
