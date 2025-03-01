"use client";
import { useLayoutEffect } from "react";
import { useAuthStore } from "./store";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const loginInState = useAuthStore((state) => state.login);

    useLayoutEffect(() => {
        async function getUser() {
            const res = await fetch("/api/profile");
            const data = await res.json();
            if (data?.token && data?.user) {
                loginInState(data.token, data.user);
            }
        }
        getUser();
    }, [loginInState]);

    return children;
}
