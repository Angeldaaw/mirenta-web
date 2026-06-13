import { CreatePropertyRequest, Property } from "@/types/property";
import { apiRequest } from "./api";

const BASE_PROPERTIES_ENDPOINT = "/properties";

export async function getProperties(token: string): Promise<Property[]> {
    const payload = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return apiRequest<Property[]>(BASE_PROPERTIES_ENDPOINT, payload);
}

export async function createProperty(
    token: string,
    request: CreatePropertyRequest
): Promise<Property> {
    const payload = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    };

    return apiRequest<Property>(BASE_PROPERTIES_ENDPOINT, payload);
}
