import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import { env } from "$env/dynamic/private";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
//  skip create

export let DB: mysql.Connection;

export const getDB = async () => {
    if (!DB) {
        DB = await mysql.createConnection(env.DATABASE_URL);
    }
    return drizzle(DB, { schema, mode: "default" });
}
