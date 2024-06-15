import { Role } from "@prisma/client";

export interface UserResponse {
    id: number;
    email: string;
    name: string;
    phone: string | null;
    role: Role;
    token?: string | null
}


