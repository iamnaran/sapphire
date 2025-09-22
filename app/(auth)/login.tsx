import {useAuthStore} from "@/src/store/auth/authStore";
import {useState} from "react";
import {Animated, Pressable, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import '../global.css';
import ScrollView = Animated.ScrollView;

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
        await login({email, password});
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>

                <View className="flex-1 justify-center items-center px-6">
                    <Text className="text-3xl  mb-10 text-gray-800">Login</Text>

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-800"
                    />

                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-800"
                    />

                    {error && (
                        <Text className="text-red-500 mb-4 text-center">{error}</Text>
                    )}

                    <Pressable
                        className="w-full bg-blue-500 py-3 rounded-lg mt-2"
                        onPress={handleLogin}
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            Login
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
