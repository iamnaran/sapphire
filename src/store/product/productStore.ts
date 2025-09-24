import {create} from "zustand";
import {syncProducts} from "@/src/data/repo/productRepository";
import {ProductState} from "@/src/store/product/productState";

export const useProductStore = create<ProductState>((set) => ({
    loading: false,
    error: undefined,
    refresh: async () => {
        set({ loading: true, error: undefined });
        try {
            await syncProducts();
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },
}));