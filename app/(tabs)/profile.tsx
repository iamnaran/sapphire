import { useAuthStore } from "@/src/store/auth/authStore";
import { View, Text, Button } from "react-native";

export default function Profile() {
  const { user, logout } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">👤 {user?.name}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}