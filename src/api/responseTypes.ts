// AUTH TYPES
export type TResponseAuthData = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: Date | null;
    updated: Date | null;
    token?: string;
    avatar?: string;
};