"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
export function AuthProvider({children}: {children: React.ReactNode}) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedToken = getCookie("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser) as User);

        setLoading(false);
    }, []);

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
        <AuthContext.Provider value={{user, token, loading, login, logout}}>
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