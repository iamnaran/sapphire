import {getDatabase} from "@/src/data/dbManager";
import {ProductEntity} from "@/src/data/entities/product/productEntity";
import {ProductDTO} from "@/src/data/model/product/productDTO";
import {fetchProducts} from "@/src/api/services/productServices";
import {mapProductsToDTO, mapToProductEntity} from "@/src/data/model/product/productMapper";


export const observeProducts = () => {
    const db = getDatabase();
    return db.get<ProductEntity>("products").query().observe();
};

export const upsertProducts = async (products: ProductDTO[]) => {
    const db = getDatabase();
    const collection = db.get<ProductEntity>("products");

    await db.write(async () => {
        await Promise.all(
            products.map(async (p) => {
                const existing = await collection.find(p.id.toString()).catch(() => null);
                if (existing) {
                    await existing.update((prod) => {
                        mapToProductEntity(prod, p);
                    });
                } else {
                    await collection.create((prod) => {
                        prod._raw.id = `${p.id}`;
                        mapToProductEntity(prod, p);
                    });
                }
            })
        );
    });
};

/**
 * Fetch products from API and sync with DB
 */
export const syncProducts = async () => {
    const response = await fetchProducts();
    await upsertProducts(mapProductsToDTO(response.products) ?? []);
};