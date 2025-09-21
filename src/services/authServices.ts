import apiClient from "../api/apiClient";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export async function loginApi(payload: LoginDTO): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function logoutApi(): Promise<void> {
  await apiClient.post("/auth/logout");
}