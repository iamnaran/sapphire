import { useState } from "react";
import { View, Text, FlatList, Button, Pressable } from "react-native";

export default function Home() {
    const [items, setItems] = useState<string[]>([]);

    // Generate random list of 10 items
    const loadRandomList = () => {
        const randomList = Array.from({ length: 100 }, () =>
            Math.random().toString(36).substring(2, 7)
        );
        setItems(randomList);
    };

    return (
        <View className="flex-1 items-center pt-20 px-5 bg-white">
            <Text className="text-2xl font-bold mb-5">🏠 Home Page</Text>

            <Pressable
                className="bg-blue-500 px-4 py-2 rounded-md mb-5"
                onPress={loadRandomList}
            >
                <Text className="text-white font-medium">Load Random List</Text>
            </Pressable>

            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View className="bg-gray-200 rounded-md py-3 my-2 items-center w-full">
                        <Text className="text-black">{item}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text className="text-gray-400 mt-5">
                        No items yet. Press the button!
                    </Text>
                }
                className="w-full"
            />
        </View>
    );
}