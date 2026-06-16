import { ApiErrorResponse } from "@/types/api_error";
import { ApiRequestOptions } from "@/types/api_request_options";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ERROR_API_DEFAULT = "No se pudo completar la solicitud";

export function getApiUrl() {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL no está configurada");
    }

    return API_URL;
}

export async function readErrorMessage(response: Response) {
    try {
        const data = (await response.json()) as ApiErrorResponse;
        return data.error ?? ERROR_API_DEFAULT;
    } catch {
        return ERROR_API_DEFAULT;
    }
}

export async function apiRequest<T>(endpoint: string, options?: ApiRequestOptions) {
    const {token, headers, ...fetchOptions} = options??{};
    const response = await fetch(`${getApiUrl()}${endpoint}`, {
        ...fetchOptions,
        headers: {
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
            ...headers,
        },
    }); 

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    if (response.status === 204){
        return undefined as T;
    }
    
    return response.json() as Promise<T>;
}