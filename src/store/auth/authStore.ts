import { create } from "zustand";
import { setAuthToken } from "../../api/apiClient";
import { loginApi, logoutApi } from "@/src/api/services/authServices";
import {AuthState} from "@/src/store/auth/authState";
import {LoginRequest} from "@/src/data/model/auth/loginRequest";
import {deleteTokens, saveToken} from "@/src/store/secure/secureStore";


export const useAuthStore = create<AuthState>((set, get) => ({
    authResponse: null,
    accessToken: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,

    // actions reference external helper functions
    loginAction: (payload) => performLogin(set, payload),
    logoutAction: () => performLogout(set),
}));

export const performLogin = async (set: any, payload: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
        const authResponse = await loginApi(payload);
        set({
            authResponse,
            accessToken: authResponse.accessToken,
            isLoggedIn: true,
            isLoading: false,
        });
        setAuthToken(authResponse.accessToken);
        await saveToken(authResponse.accessToken, authResponse.refreshToken);


    } catch (err: any) {
        set({ error: err.message || "Login failed", isLoading: false });
    }
};

// Logout action
export const performLogout = async (set: any) => {
    try {
        await logoutApi();
        await deleteTokens();
    } catch {
        // ignore errors
    }

    setAuthToken(null);
    set({
        authResponse: null,
        accessToken: null,
        isLoggedIn: false,
        isLoading: false,
        error: null,
    });
};
