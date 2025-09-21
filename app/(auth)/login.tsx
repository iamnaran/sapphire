import { useAuthStore } from "@/src/store/authStore";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }
    await login({ email, password });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl font-bold mb-6">Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        {error && <Text className="text-red-500 mb-4">{error}</Text>}

        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}
