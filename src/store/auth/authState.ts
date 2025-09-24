import {AuthResponse} from "@/src/data/model/auth/authResponse";
import {LoginRequest} from "@/src/data/model/auth/loginRequest";

export interface AuthState {
    authResponse: AuthResponse | null;
    isLoggedIn: boolean;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;

    loginAction: (payload: LoginRequest) => Promise<void>;
    logoutAction: () => Promise<void>;
}