import dotenv from 'dotenv';
import path from "path";
import url from "url";
import pg from 'pg';
import { readFile } from 'fs/promises';

dotenv.config();
const { Pool } = pg;
const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
});

/**
 * @param {string} name
 * @param {{ (client: pg.PoolClient): Promise<void>; }} cb
 */
export async function dbContext(name, cb) {
    const client = await pool.connect();
    try {
        await cb(client);
    }
    catch (err) {
        console.error(`Something went wrong in ${name}: `, err);
    }
    finally {
        client.release();
    }
}

export async function importDataIfEmpty() {
    await dbContext("importDataIfEmpty", async (client) => {
        const result = await client.query('SELECT COUNT(*) FROM entries');
        const count = parseInt(result.rows[0].count, 10);

        if (count === 0){
            console.log("Importing data...");

            const jsonData = JSON.parse(await readFile(path.join(dirname, "englishdictionary.json"), 'utf8'));
            const items = jsonData.entries;
            for (const entry of items) {
                const word = entry.word || '';
                const wordtype = entry.wordtype || '';
                const definition = entry.definition || '';
                const example = entry.example || '';

                const query = `
                    INSERT INTO entries (word, wordtype, definition, example)
                    VALUES ($1, $2, $3, $4)
                `;
                await client.query(query, [word, wordtype, definition, example]);
            }
            console.log("Data has been imported.");
        }
        else {
            console.log("Data has been initizlized. Don't have to import.")
        }
    });
}
