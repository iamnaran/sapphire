import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { setAuthToken } from "../api/apiClient";
import { loginApi, LoginDTO, logoutApi } from "../services/authServices";

interface User {
  id: string;
  name: string;
  username: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;

  login: (payload: LoginDTO) => Promise<void>;
  logout: () => Promise<void>;
  hydrateToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: true,
  error: null,

  login: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await loginApi(payload);

      // Store token securely
      await SecureStore.setItemAsync("accessToken", token);
      // Set token in Axios interceptor
      setAuthToken(token);

      set({ accessToken: token, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await logoutApi();
    } catch (err) {
      // ignore API logout errors
    }
    await SecureStore.deleteItemAsync("accessToken");
    setAuthToken(null);
    set({ accessToken: null, user: null });
  },

  hydrateToken: async () => {
    const token = await SecureStore.getItemAsync("accessToken");
    if (token) {
      setAuthToken(token);
      set({ accessToken: token, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },
}));
