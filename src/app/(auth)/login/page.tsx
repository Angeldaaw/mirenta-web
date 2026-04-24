"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err) {
            console.log(err);
            setError("Usuario o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} 
            className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow">

                <h1 className="text-2xl font-bold">Iniciar Sesión</h1>

                {error && (
                    <p className="text-ms text-red-500">{error}</p>
                )}

                <input 
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border px-3 py-2"
                    required/>

                <input 
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounder border px-3 py-2"
                    required/>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-black py-2 text-white disabled:opacity-50">
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>

            </form>
        </div>
    );
}