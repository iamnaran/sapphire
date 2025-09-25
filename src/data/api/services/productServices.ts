import apiClient from "../apiClient";
import {ProductResponse} from "@/src/data/model/product/product";

export const fetchProducts = async (): Promise<ProductResponse> => {
    const response = await apiClient.get<ProductResponse>(`/products`);
    console.log("Received response");
    console.log(response.data.products?.length);
    return response.data;
};