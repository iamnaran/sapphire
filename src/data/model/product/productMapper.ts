import {Product} from "@/src/data/model/product/product";
import {ProductDTO} from "@/src/data/model/product/productDTO";
import {ProductEntity} from "@/src/data/db/entities/product/productEntity";

export const mapProductToDTO = (product: Product): ProductDTO => ({
    id: product.id,
    title: product.title ?? "",
    description: product.description ?? "",
    category: product.category ?? "",
    price: product.price ?? 0,
    rating: product.rating ?? 0,
    brand: product.brand ?? "",
    thumbnail: product.thumbnail ?? "",
});

export const mapToProductEntity = (entity: ProductEntity, dto: ProductDTO) => {
    entity.title = dto.title ?? "";
    entity.description = dto.description ?? "";
    entity.category = dto.category ?? "";
    entity.price = dto.price ?? 0;
    entity.rating = dto.rating ?? 0;
    entity.brand = dto.brand ?? "";
    entity.thumbnail = dto.thumbnail ?? "";
};

export const mapProductsToDTO = (products: Product[] | undefined): ProductDTO[] =>
    (products ?? []).map(mapProductToDTO);