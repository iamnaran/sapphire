import { useAuthStore } from "@/src/store/auth/authStore";
import { View, Button } from "react-native";
import {navigateToLogin} from "@/src/navigation/navigation";

export default function Profile() {
    const { logoutAction } = useAuthStore();

    const handleLogout = async () => {
        await logoutAction();
        navigateToLogin()
    };

    return (
        <View className="flex-1 items-center justify-center">
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}