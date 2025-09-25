import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {ProductDTO} from "@/src/data/model/product/productDTO";

interface ProductItemProps {
    product: ProductDTO;
    onPress?: () => void;
}

const ProductItemComponent: React.FC<ProductItemProps> = ({ product, onPress }) => {
    return (
        <TouchableOpacity
            className="flex-row bg-white rounded-xl p-4 mb-4 shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: product.thumbnail }}
                className="w-20 h-20 rounded-lg mr-4 bg-gray-200"
                resizeMode="cover"
            />
            <View className="flex-1 justify-center">
                <Text className="text-lg font-semibold">{product.title}</Text>
                <Text className="text-gray-500 text-sm font-light">{product.category?.toUpperCase()}</Text>
                <Text className="text-blue-500 font-bold mt-1">${product.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const ProductItem = memo(
    ProductItemComponent,
    (prev, next) => prev.product.id === next.product.id
);

export default ProductItem;