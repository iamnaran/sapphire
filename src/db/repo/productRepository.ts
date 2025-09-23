import { Product } from "@/src/model/product/product";
import {ProductModel} from "@/src/db/entities/product/productEntity";
import {getDatabase} from "@/src/db/dbManager";

export class ProductRepository {
    private db = getDatabase();

    /** Save products to DB */
    async saveProducts(products: Product[]) {
        await this.db.action(async () => {
            const collection = this.db.get<ProductModel>("products");

            // Optional: clear old products
            const oldProducts = await collection.query().fetch();
            for (const p of oldProducts) {
                await p.markAsDeleted();
            }

            for (const p of products) {
                await collection.create((record) => {
                    record.title = p.title;
                    record.description = p.description;
                    record.category = p.category;
                    record.price = p.price;
                    record.discountPercentage = p.discountPercentage;
                    record.rating = p.rating;
                    record.stock = p.stock;
                    record.brand = p.brand;
                    record.thumbnail = p.thumbnail;
                    record.images = p.images;
                });
            }
        });
    }

    /** Read products from DB */
    async getProducts(): Promise<Product[]> {
        const dbProducts = await this.db.get<ProductModel>("products").query().fetch();
        return dbProducts.map((p) => ({
            id: Number(p.id),
            title: p.title,
            description: p.description,
            category: p.category,
            price: p.price,
            discountPercentage: p.discountPercentage,
            rating: p.rating,
            stock: p.stock,
            brand: p.brand,
            thumbnail: p.thumbnail,
            images: p.images,
        }));
    }
}