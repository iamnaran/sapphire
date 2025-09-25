import { tableSchema } from '@nozbe/watermelondb';

export const productSchema = tableSchema({
    name: 'products',
    columns: [
        { name: 'product_id', type: 'number' },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'category', type: 'string' , isOptional: true },
        { name: 'price', type: 'number'},
        { name: 'discount_percentage', type: 'number'},
        { name: 'rating', type: 'number'},
        { name: 'stock', type: 'number'},
        { name: 'brand', type: 'string', isOptional: true },
        { name: 'thumbnail', type: 'string', isOptional: true },
    ],
});