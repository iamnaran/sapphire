import React from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ProductDetailScreen() {
    const params = useLocalSearchParams<{ productId: string }>();
    const { productId } = params;

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center">
            <Text className="text-xl font-bold">Product Detail</Text>
            <Text className="text-gray-700 mt-2">ID: {productId}</Text>
        </SafeAreaView>
    );
}