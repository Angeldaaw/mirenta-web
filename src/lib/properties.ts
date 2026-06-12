import { CreatePropertyRequest, Property } from "@/types/property";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiErrorResponse = {
    error?: string;
};

async function readErrorMessage(response: Response) {
    try {
        const data = (await response.json()) as ApiErrorResponse;
        return data.error ?? "No se pudo completar la solicitud.";
    } catch {
        return "No se pudo completar la solicitud.";
    }
}

function getApiUrl() {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL no esta configurada.");
    }

    return API_URL;
}

export async function getProperties(token: string): Promise<Property[]> {
    const response = await fetch(`${getApiUrl()}/properties`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    return response.json() as Promise<Property[]>;
}

export async function createProperty(
    token: string,
    request: CreatePropertyRequest
): Promise<Property> {
    const response = await fetch(`${getApiUrl()}/properties`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    return response.json() as Promise<Property>;
}
