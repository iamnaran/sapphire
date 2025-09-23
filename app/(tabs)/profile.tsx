import { useAuthStore } from "@/src/store/auth/authStore";
import { View, Button } from "react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "@/src/routes/routes";

export default function Profile() {
    const { logoutAction } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAction();
        router.replace(ROUTES.AUTH.LOGIN);
    };

    return (
        <View className="flex-1 items-center justify-center">
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}