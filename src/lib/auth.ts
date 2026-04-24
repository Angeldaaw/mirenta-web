import { AuthResponse } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    });

    if (!res.ok) {
        throw new Error("Credenciales inválidas");
    }

    const data: AuthResponse = await res.json();
    return data;
}