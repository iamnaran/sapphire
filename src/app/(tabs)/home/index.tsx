import React, {useEffect, useCallback} from "react";
import {View, FlatList, ActivityIndicator, Text, ListRenderItem} from "react-native";
import {ProductDTO} from "@/src/data/model/product/productDTO";
import ProductItem from "@/src/app/(tabs)/home/component/productItem";
import {useProductStore} from "@/src/store/product/productStore";
import {SafeAreaView} from "react-native-safe-area-context";
import {navigateToProductDetail} from "@/src/navigation/navigation";

export default function Home() {
    const {products, loading, error, refresh} = useProductStore();

    useEffect(() => {
        refresh(false);
    }, [refresh]);

    // Memoized renderItem
    const renderItem: ListRenderItem<ProductDTO> = useCallback(
        ({item}) =>
            <ProductItem product={item} onPress={() =>
                navigateToProductDetail(item.id.toString())
            }/>,
        []
    );

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
            {loading && products.length === 0 && (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#2563EB"/>
                </View>
            )}

            {!loading && products.length === 0 && error && (
                <View className="flex-1 justify-center items-center px-4">
                    <Text className="text-red-500 text-center">{error}</Text>
                </View>
            )}

            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{paddingTop: 0, paddingBottom: 20}}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={() => refresh(true)}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
                removeClippedSubviews={true}
            />
        </SafeAreaView>
    );
}