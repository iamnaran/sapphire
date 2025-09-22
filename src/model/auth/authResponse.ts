export interface AuthResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: "male" | "female" | string;
    image: string;
    accessToken: string;
    refreshToken: string;
}