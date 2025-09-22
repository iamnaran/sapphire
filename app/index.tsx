import { useAuthStore } from "@/src/store/auth/authStore";
import { Slot, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, ActivityIndicator, Text } from "react-native";
import { useEffect } from "react";

export default function RootLayout() {
    const { accessToken, isLoggedIn } = useAuthStore();
    const router = useRouter();

    // Redirect after loading
    useEffect(() => {
        if (isLoggedIn) {
             router.replace("/(auth)/login");
        }else router.replace("/(tabs)/home");
    }, [accessToken, isLoggedIn, router]);

    if (isLoggedIn) {
        return (
            <SafeAreaProvider>
                <View className="flex-1 justify-center items-center bg-white">
                    <ActivityIndicator size="large" color="#2563EB" />
                    <Text className="mt-4 text-gray-600">Loading...</Text>
                </View>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <Slot /> {/* Only render the Slot after hydration */}
        </SafeAreaProvider>
    );
}