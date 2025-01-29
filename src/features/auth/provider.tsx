"use client";
import { User } from "@/types/types";
import { useLayoutEffect } from "react";
import { useAuthStore } from "./store";

interface Props {
    children: React.ReactNode;
    user: User | null;
    token: string | null;
}
export default function AuthProvider({ children, user, token }: Props) {
    const login = useAuthStore((state) => state.login);

    useLayoutEffect(() => {
        if (user && token) {
            login(token, user);
        }
    }, [user, token]);

    return children;
}
