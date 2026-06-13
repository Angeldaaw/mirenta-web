import { AuthResponse } from "@/types/auth";
import { apiRequest } from "./api";

export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    };

    return apiRequest<AuthResponse>("/auth/login", payload);
}