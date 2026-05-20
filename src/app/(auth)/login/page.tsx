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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Usuario o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow">

                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-[var(--foreground)]">
                        MiRenta
                    </h1>
                    <p className="text-sm text-[var(--muted-foreground)]">
                        Administra tus propiedades desde un solo lugar.
                    </p>
                </div>

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label 
                        htmlFor="email"
                        className="block text-sm font-medium text-[var(--foreground)]"
                        >
                        Correo electrónico
                    </label>
                    <input 
                        id="email"
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-[var(--input)] bg-white px-3 py-2 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-100"
                        required/>
                </div>

                <div className="space-y-2">
                    <label htmlFor="password"
                        className="block text-sm font-medium text-[var(--foreground)]"
                        >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-[var(--input)] bg-white px-3 py-2 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-100"
                        required
                        />

                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[var(--primary)] py-2.5 text-[var(--primary-foreground)] transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>

            </form>
        </main>
    );
}