import { useAuthStore } from "@/src/store/authStore";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const { accessToken, isLoading, hydrateToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    hydrateToken();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!accessToken) router.replace("/login" as const);
      else router.replace("/home" as const);
    }
  }, [accessToken, isLoading]);

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}
