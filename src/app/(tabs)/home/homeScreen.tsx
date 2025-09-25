import React, { useEffect, useCallback } from "react";
import { View, FlatList, Pressable, ActivityIndicator, Text, ListRenderItem } from "react-native";
import {ProductDTO} from "@/src/data/model/product/productDTO";
import ProductItem from "@/src/app/(tabs)/home/component/productItem";
import {useProductStore} from "@/src/store/product/productStore";
import {SafeAreaView} from "react-native-safe-area-context";

export default function HomeScreen() {
    const { products, loading, error, refresh } = useProductStore();

    useEffect(() => {
        refresh();
    }, [refresh]);

    // Memoized renderItem with proper typing
    const renderItem: ListRenderItem<ProductDTO> = useCallback(
        ({ item }) => <ProductItem product={item} />,
        []
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
                refreshing={loading}
                onRefresh={refresh}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
                removeClippedSubviews={true}
                ListHeaderComponent={
                    <Pressable
                        className="bg-blue-500 px-4 py-2 rounded-md mb-5 self-center"
                        onPress={refresh}
                    >
                        <Text className="text-white font-medium">Refresh Products</Text>
                    </Pressable>
                }

            />
        </SafeAreaView>
    );
}
