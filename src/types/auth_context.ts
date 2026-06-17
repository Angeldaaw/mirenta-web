import { User } from "@/types/user";

export type AuthContextType = {
    user: User | null;
    token: string | null,
    loading: boolean,
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}