import { CreatePropertyRequest, Property, UpdatePropertyRequest } from "@/types/property";
import { apiRequest } from "./api";

const BASE_PROPERTIES_ENDPOINT = "/properties";

export async function getProperties(token: string): Promise<Property[]> {
    const options = {
        token,
    };

    return apiRequest<Property[]>(BASE_PROPERTIES_ENDPOINT, options);
}

export async function createProperty(
    token: string,
    request: CreatePropertyRequest
): Promise<Property> {
    const options = {
        method: "POST",
        token,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    };

    return apiRequest<Property>(BASE_PROPERTIES_ENDPOINT, options);
}

export async function updateProperty(
    token: string,
    request: UpdatePropertyRequest
): Promise<Property> {
    const options = {
        method: "PUT",
        token,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    };

    return apiRequest<Property>(BASE_PROPERTIES_ENDPOINT, options);
}
