export type Property = {
    id: string;
    name: string;
    address: string;
    monthlyRent: number;
    status: string;
    createdAt: Date;
    ownerId?: string;
}

export type CreatePropertyRequest = {
    name: string;
    address: string;
    monthlyRent: number;
    status: string;
    ownerId?: string;
}

export type UpdatePropertyRequest = {
    name: string;
    address: string;
    monthlyRent: number;
    status: string;
    ownerId?: string;
}