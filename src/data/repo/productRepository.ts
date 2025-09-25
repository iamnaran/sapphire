import {ProductEntity} from "@/src/data/db/entities/product/productEntity";
import {ProductDTO} from "@/src/data/model/product/productDTO";
import {fetchProducts} from "@/src/data/api/services/productServices";
import {mapProductsToDTO, mapToProductEntity} from "@/src/data/model/product/productMapper";
import appDatabase from "@/src/data/db/appDbManager";


export const upsertProducts = async (products: ProductDTO[]) => {
    const db = appDatabase;
    const collection = db.get<ProductEntity>("products");

    await db.write(async () => {
        await Promise.all(
            products.map(async (dto) => {
                const existing = await collection.find(dto.id.toString()).catch(() => null);

                if (existing) {
                    await existing.update((prod) => mapToProductEntity(prod, dto));
                } else {
                    await collection.create((prod) => {
                        prod._raw.id = `${dto.id}`;
                        mapToProductEntity(prod, dto);
                    });
                }
            })
        );
    });
};

/**
 * Get all products from local DB
 */
export const getLocalProducts = async (): Promise<ProductDTO[]> => {
    const collection = appDatabase.get<ProductEntity>("products");
    const allProducts = await collection.query().fetch();

    return allProducts.map((p) => ({
        id: Number(p.id),
        title: p.title || "",
        description: p.description || "",
        category: p.category || "",
        price: p.price || 0,
        rating: p.rating || 0,
        brand: p.brand || "",
        thumbnail: p.thumbnail || "",
    }));
};



/**
 * Fetch products from API and sync with DB
 */
export const syncProducts = async () => {
    try {
        const response = await fetchProducts();
        const mappedResponse = mapProductsToDTO(response.products) ?? [];
        await upsertProducts(mappedResponse);
    } catch (err) {
        console.error("Failed to sync products:", err);
    }
};


export const observeProducts = () => {
    return appDatabase.get<ProductEntity>("products").query().observe();
};
