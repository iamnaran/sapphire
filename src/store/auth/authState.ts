import {AuthResponse} from "@/src/model/auth/authResponse";
import {LoginRequest} from "@/src/model/auth/loginRequest";

export interface AuthState {
    authResponse: AuthResponse | null;
    isLoggedIn: boolean;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;

    loginAction: (payload: LoginRequest) => Promise<void>;
    logoutAction: () => Promise<void>;
}