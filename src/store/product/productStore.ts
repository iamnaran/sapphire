import {create} from "zustand";
import {ProductState} from "@/src/store/product/productState";
import {syncProducts} from "@/src/data/repo/productRepository";
import {waitForMe} from "@/src/utils/utils";

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    loading: false,
    error: undefined,

    refresh: async (isPullToRefresh = false) => {
        set({ loading: true, error: undefined });

        try {
            // Sync API + DB
            await syncProducts();

            // Only delay if triggered by pull-to-refresh
            if (isPullToRefresh) {
                await waitForMe(2000);
            }

            // Load products from local DB
            const dbProducts = await import("@/src/data/repo/productRepository").then(
                (repo) => repo.getLocalProducts()
            );

            set({ products: dbProducts, loading: false });
        } catch (err: any) {
            set({
                error: err?.message || "Failed to load products",
                loading: false,
            });
        }
    },
}));