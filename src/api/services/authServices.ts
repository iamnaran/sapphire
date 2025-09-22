import apiClient from "../apiClient";
import {AuthResponse} from "@/src/model/auth/authResponse";
import {LoginRequest} from "@/src/model/auth/loginRequest";

export async function loginApi(payload: LoginRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function logoutApi(): Promise<void> {
  await apiClient.post("/auth/logout");
}