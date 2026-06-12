export type Property = {
    id: string;
    name: string;
    address: string;
    monthlyRent: number;
}

export type CreatePropertyRequest = {
    name: string;
    address: string;
    monthlyRent: number;
}
