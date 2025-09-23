
import { Model } from "@nozbe/watermelondb";
import { field, json } from "@nozbe/watermelondb/decorators";

export class ProductModel extends Model {
    static table = "products";

    @field("title") title!: string;
    @field("description") description!: string;
    @field("category") category!: string;
    @field("price") price!: number;
    @field("discountPercentage") discountPercentage!: number;
    @field("rating") rating!: number;
    @field("stock") stock!: number;
    @field("brand") brand!: string;
    @field("thumbnail") thumbnail!: string;
    @json("images", (value) => (Array.isArray(value) ? value : [])) images!: string[];
}