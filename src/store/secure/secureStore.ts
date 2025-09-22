import * as SecureStore from "expo-secure-store";
import {STORAGE_KEYS} from "@/src/store/secure/storageKeys";

export const saveToken = async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};


export const getAccessToken = async (): Promise<string | null> => {
    try {
        return await SecureStore.getItemAsync("accessToken");
    } catch (err) {
        console.error("Error reading access token:", err);
        return null;
    }
};

export const getRefreshToken = async () => {
    return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
};

export const isUserLoggedIn = async (): Promise<boolean> => {
    const token = await getAccessToken();
    return Boolean(token); // returns true if token exists
};

export const deleteTokens = async () => {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
};