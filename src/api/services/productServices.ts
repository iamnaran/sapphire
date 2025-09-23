import apiClient from "../apiClient";
import {ProductResponse} from "@/src/model/product/product";

export const fetchProducts = async (): Promise<ProductResponse> => {
    const response = await apiClient.get<ProductResponse>(`/products`);
    return response.data;
};