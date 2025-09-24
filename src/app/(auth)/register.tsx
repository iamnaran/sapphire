import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/src/store/auth/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    const LoginDTO = { email, password };
    await login(LoginDTO);
    router.replace("/(tabs)/home");
  };

  return (
    <View className="flex-1 justify-center p-6">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border p-2 mb-2"
      />
      <Button title={isLoading ? "Loading..." : "Login"} onPress={handleLogin} />
      {error && <Text className="text-red-500">{error}</Text>}
      <Button
        title="Register"
        onPress={() => router.push("/register")}
        color="gray"
      />
    </View>
  );
}