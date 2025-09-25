import {ProductDTO} from "@/src/data/model/product/productDTO";

export interface ProductState {
    products: ProductDTO[];
    loading: boolean;
    error?: string;
    refresh: (isPullToRefresh?: boolean) => Promise<void>;
}