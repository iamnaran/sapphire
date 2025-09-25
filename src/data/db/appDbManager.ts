import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import {ProductEntity} from "@/src/data/db/entities/product/productEntity";

import dbSchema from "@/src/data/db/appDbSchema";
import dbMigration from "@/src/data/db/appDbMigration";

const adapter = new SQLiteAdapter({
    schema: dbSchema,
    migrations: dbMigration,
    dbName: 'x-sapphire-x',
    jsi: true,
    onSetUpError: error => {
        console.log(error)
    }
})

const appDatabase = new Database({
    adapter,
    modelClasses: [
        ProductEntity
    ],
})

export default appDatabase;