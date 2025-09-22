import { create } from "zustand";
import { setAuthToken } from "../../api/apiClient";
import { loginApi, logoutApi } from "@/src/api/services/authServices";
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
    loginAction: (payload) => performLogin(set, payload),
    logoutAction: () => performLogout(set),
}));

export const performLogin = async (set: any, payload: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
        const authResponse = await loginApi(payload);

        console.log(authResponse);

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
export const performLogout = async (set: any) => {
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
