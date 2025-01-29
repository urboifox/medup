"use client";

import { useAuthStore } from "@/features/auth/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    useEffect(() => {
        async function logoutUser() {
            await fetch("/api/logout", {
                method: "POST"
            }).finally(() => {
                logout();
                router.push("/");
            });
        }
        logoutUser();
    }, []);

    return null;
}
