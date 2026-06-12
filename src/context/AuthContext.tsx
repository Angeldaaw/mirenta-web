"use client";

import { createContext, useContext, useSyncExternalStore, useState } from "react";
import { loginRequest } from "@/lib/auth";
import { User } from "@/types/user";

type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const subscribeToHydration = (callback: () => void) => {
    callback();
    return () => {};
};

const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function readStoredToken() {
    if (typeof document === "undefined") return null;
    return getCookie("token");
}

function readStoredUser() {
    if (typeof window === "undefined") return null;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
        return JSON.parse(storedUser) as User;
    } catch {
        localStorage.removeItem("user");
        return null;
    }
}

export function AuthProvider({children}: {children: React.ReactNode}) {
    const hydrated = useSyncExternalStore(
        subscribeToHydration,
        getClientSnapshot,
        getServerSnapshot
    );
    const [token, setToken] = useState<string | null>(readStoredToken);
    const [user, setUser] = useState<User | null>(readStoredUser);

    const login = async(email: string, password: string): Promise<void> => {
        const data = await loginRequest(email, password);

        // Guardar token en cookie
        document.cookie = `token=${data.token};path=/`;
        // Guardar user en localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);
    }

    const logout = () => {
        document.cookie = "token=; Max-Age=0; path=/;";
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, token, loading: !hydrated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

function getCookie(name: string) {
    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );

    return match ? match[2] : null;
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
