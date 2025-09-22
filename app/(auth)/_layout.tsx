import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AuthLayout() {
    return (
        <SafeAreaProvider>
            <Slot />
        </SafeAreaProvider>
    );
}