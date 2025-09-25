import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export class ProductEntity extends Model {
    static table = "products";

    @field("product_id") productId: string;
    @field("title") title: string;
    @field("description") description!: string;
    @field("category") category!: string;
    @field("price") price: number;
    @field("discountPercentage") discountPercentage!: number;
    @field("rating") rating: number;
    @field("stock") stock: number;
    @field("brand") brand: string;
    @field("thumbnail") thumbnail: string;
    @field("image") image!: string;
}


