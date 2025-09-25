import {Stack} from "expo-router";

export default function HomeStackLayout() {
    return (
        <Stack>
            {/* Home screen */}
            <Stack.Screen name="index" options={{ title: "Home"}}/>

            {/* Product detail screen */}
            <Stack.Screen
                name="details/[productId]"
                options={{headerBackTitle: " ",  title: "Product Details"}}
            />
        </Stack>
    );
}