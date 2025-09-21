import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const { accessToken, hydrateToken } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      await hydrateToken();
      if (accessToken) router.replace("/home" as const);
      else router.replace("/login" as const);
    };
    init();
  }, [accessToken]);

  return null; // No UI needed, just redirect
}