import {useAuthStore} from "@/src/store/auth/authStore";
import {useEffect, useRef, useState} from "react";
import {
    Animated,
    Text,
    Image,
    TextInput,
    View,
    Alert,
    ImageBackground
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import '../global.css';
import ScrollView = Animated.ScrollView;
import {router, useRouter} from "expo-router";
import LoginButton from "@/src/components/loginButton";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const passwordRef = useRef<TextInput>(null);

    const login = useAuthStore((state) => state.loginAction);
    const error = useAuthStore((state) => state.error);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const isLoading = useAuthStore((state) => state.isLoading);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert(
                "Enter Valid Credential",
                "Please enter your email and password.",
                [
                    {text: "Okay", style: "cancel"}
                ],
                {cancelable: true}
            );
            return;
        }
        console.log(email,password);
        await login({email, password});
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.replace("/(tabs)/home");
        }
    }, [isLoggedIn, router]);


    return (

        <ImageBackground
            source={require("../../assets/images/background-login.png")} // background image
            style={{flex: 1}}
            className={"flex-1 w-full h-full"}
            resizeMode="cover">

            <SafeAreaView className="flex-1  bg-transparent">
                <ScrollView>

                    <View className="flex-1 justify-center items-center mt-16 mx-6 my-4 px-6">
                        <Image
                            source={require("../../assets/images/icon.png")} // local image
                            style={{width: 120, height: 120}}
                            resizeMode="contain"
                        />

                        <View style={{height: 20}}/>

                        <Text className="text-3xl mb-10 font-bold text-gray-800 pt-3">Welcome to Sapphire</Text>

                        <Text className="w-full font-medium rounded-lg mb-4 text-gray-600">Email or Username</Text>

                        <TextInput
                            placeholder="Username"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            textContentType={"emailAddress"}
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current?.focus()}
                            className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-800 px-5 py-5"
                        />

                        <Text className="w-full font-medium rounded-lg mb-4 text-gray-600 pt-3">Password</Text>
                        <TextInput
                            ref={passwordRef}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor={"gray-100"}
                            textContentType={"password"}
                            returnKeyType="done"
                            onSubmitEditing={handleLogin}
                            className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-600 px-5 py-5"
                        />
                        <View className="h-10">
                            {error && (
                                <Text className="text-red-500 mb-4 text-center">{error}</Text>
                            )}
                        </View>


                        {/*<Pressable*/}
                        {/*    className="w-full bg-blue-500 py-3 rounded-lg mt-2"*/}
                        {/*    onPress={handleLogin}>*/}
                        {/*    <Text className="text-white text-center font-semibold text-lg">*/}
                        {/*        Login*/}
                        {/*    </Text>*/}
                        {/*</Pressable>*/}

                        <LoginButton
                            loading={isLoading}
                            onPress={handleLogin}
                            disabled={isLoggedIn}

                            text='Login'>

                        </LoginButton>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>

    );
}
