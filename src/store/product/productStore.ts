import {create} from "zustand";
import {ProductState} from "@/src/store/product/productState";
import {getLocalProducts, syncProducts} from "@/src/data/repo/productRepository";

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    loading: false,
    error: undefined,

    refresh: async () => {
        set({ loading: true, error: undefined });

        try {
            const localProducts = await getLocalProducts();
            set({ products: localProducts, loading: false });
            console.log("Local  Products loaded ");
            console.log(localProducts.length);

            await syncProducts();

            const updatedProducts = await getLocalProducts();


            set({ products: updatedProducts });
            console.log("Updated Products loaded ");
            console.log(updatedProducts.length);

            console.log(updatedProducts);
        } catch (err: any) {
            set({ loading: false, error: err.message || "Failed to load products" });
        }
    },
}));