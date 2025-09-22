import axios from "axios";
import { useAuthStore } from "../store/auth/authStore";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

let token: string | null = null;

export const setAuthToken = (newToken: string | null) => {
  token = newToken;
};

// Request interceptor uses the token variable
apiClient.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized, redirect to login");
    }
    return Promise.reject(error);
  }
);

export default apiClient;