import { useAuthStore } from "@/src/store/auth/authStore";
import { Slot, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {ActivityIndicator, View, Text} from "react-native";
import {ROUTES} from "@/src/routes/routes";
import {useEffect} from "react";

export default function RootLayout() {
  const { accessToken, isLoading, hydrateToken } = useAuthStore();
  const router = useRouter();

    useEffect(() => {
        const init = async () => {
            try {
                await hydrateToken();
            } catch (err) {
                console.error("Failed to hydrate token:", err);
            }
        };

        void init();
    }, [hydrateToken]);


  // Redirect after loading
  useEffect(() => {
    if (!isLoading) {
      if (!accessToken) router.replace(ROUTES.AUTH.LOGIN);
      else router.replace(ROUTES.TABS.HOME);
    }
  }, [accessToken, isLoading, router]);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <View className="flex-1 justify-center  items-center bg-white">
          <ActivityIndicator size="large" color="#2563EB" />
          <Text className="mt-4 text-gray-600">Loading...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}