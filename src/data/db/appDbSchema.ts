import { appSchema, tableSchema } from '@nozbe/watermelondb'
import {productSchema} from "@/src/data/db/entities/product/productSchema";

export default appSchema({
    version: 1,
    tables: [
        productSchema
    ]
})