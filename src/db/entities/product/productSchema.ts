import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const productSchema = tableSchema({
    name: 'products',
    columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'price', type: 'number' },
        { name: 'discount_percentage', type: 'number' },
        { name: 'rating', type: 'number' },
        { name: 'stock', type: 'number' },
        { name: 'brand', type: 'string' },
        { name: 'thumbnail', type: 'string' },
    ],
});

export const mySchema = appSchema({
    version: 1,
    tables: [productSchema],
});