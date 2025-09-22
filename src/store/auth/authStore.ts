import { create } from "zustand";
import { setAuthToken } from "../../api/apiClient";
import { loginApi, logoutApi } from "../../services/authServices";
import {AuthState} from "@/src/store/auth/authState";
import {LoginRequest} from "@/src/model/auth/loginRequest";
import {deleteTokens, saveToken} from "@/src/store/secure/secureStore";


export const useAuthStore = create<AuthState>((set, get) => ({
    authResponse: null,
    accessToken: null,
    isLoggedIn: false,
    isLoading: true,
    error: null,

    // actions reference external helper functions
    login: (payload) => loginAction(set, payload),
    logout: () => logoutAction(set),
}));

export const loginAction = async (set: any, payload: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
        const authResponse = await loginApi(payload);

        await saveToken(authResponse.accessToken, authResponse.refreshToken);

        setAuthToken(authResponse.accessToken);

        set({
            authResponse,
            accessToken: authResponse.accessToken,
            isLoggedIn: true,
            isLoading: false,
        });

    } catch (err: any) {
        set({ error: err.message || "Login failed", isLoading: false });
    }
};

// Logout action
export const logoutAction = async (set: any) => {
    try {
        await logoutApi();
    } catch {
        // ignore errors
    }
    await deleteTokens();

    setAuthToken(null);
    set({
        authResponse: null,
        accessToken: null,
        isLoggedIn: false,
        error: null,
    });
};
