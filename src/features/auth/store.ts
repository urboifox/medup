import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
    token: null,
    user: null,
    login: (token: string, user: User) => {
        set({ token, user });
    },
    logout: () => {
        set({ token: null, user: null });
    }
}));
