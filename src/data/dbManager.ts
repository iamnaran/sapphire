import { Database, appSchema } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { ProductEntity } from "@/src/data/entities/product/productEntity";
import { productSchema } from "@/src/data/entities/product/productSchema";

let _database: Database | null = null;

export const getDatabase = (): Database => {
    if (_database) return _database;

    const schema = appSchema({
        version: 1,
        tables: [productSchema],
    });

    const adapter = new SQLiteAdapter({ schema });

    _database = new Database({
        adapter,
        modelClasses: [ProductEntity],
    });

    return _database;
};