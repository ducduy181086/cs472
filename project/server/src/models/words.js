import dotenv from 'dotenv';
import OpenAI from 'openai';

import { dbContext } from '../helper.js';

dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

class Word {
    /**
     * @param {string} word
     * @returns {Promise<Definition[]>}
     */
    static async getDefinitions(word) {
        word = word.toLowerCase();
        const items = [];
    
        await dbContext("getDefinitions", async (client) => {
            // Start transaction
            await client.query('BEGIN');
    
            // Fetch definitions for the word
            const query = `SELECT * FROM entries WHERE LOWER(word) LIKE $1;`;
            const result = await client.query(query, [word]);
            result.rows.forEach((r, i) => items.push(new Definition(i + 1, r.wordtype, r.definition)));
    
            // Check if the word exists in recententries
            const selectQuery = `SELECT count FROM recententries WHERE word = $1 FOR UPDATE;`;
            const selectResult = await client.query(selectQuery, [word]);
    
            if (selectResult.rows.length > 0) {
                // Word exists, update count by 1
                const updateQuery = `UPDATE recententries SET count = count + 1 WHERE word = $1 RETURNING *;`;
                await client.query(updateQuery, [word]);
            } else {
                // Word does not exist, insert with count set to 1
                const insertQuery = `INSERT INTO recententries (word, count) VALUES ($1, 1) RETURNING *;`;
                await client.query(insertQuery, [word]);
            }
    
            // Commit the transaction
            await client.query('COMMIT');
        });
    
        return items;
    }

    /**
     * @param {string} word
     * @returns {Promise<string>}
     */
    static async getExample(word) {
        word = word.toLowerCase();
        let result = "";
        await dbContext("getExample", async (client) => {
            const countResult = await client.query('SELECT COUNT(*) FROM entries WHERE LOWER(word) LIKE $1', [word]);
            const count = parseInt(countResult.rows[0].count, 10);
            if (count == 0) return;

            const query = `SELECT * FROM exampleentries WHERE LOWER(word) LIKE $1 ORDER BY uId LIMIT 1;`;
            const queryResult = await client.query(query, [word]);
            if (queryResult.rows.length > 0) {
                result = queryResult.rows[0].example;
            } else {
                // Text generator
                const response = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant that gives examples for words in a dictionary.'
                        },
                        {
                            role: 'user',
                            content: `Where does the "${word}" come from?.`
                        }
                    ],
                    max_tokens: 64
                });
                result = response.choices[0].message.content;
                const insCmd = `INSERT INTO exampleentries (word, example) VALUES ($1, $2) RETURNING *;`;
                const insResult = await client.query(insCmd, [word, result]);
            }
        });
        return result;
    }

    /**
     * @returns {Promise<string[]>}
     */
    static async getRecentWords() {
        const items = [];
        await dbContext("getRecentWords", async (client) => {
            const query = `
                SELECT word
                FROM recententries
                ORDER BY count DESC
                LIMIT 10;`;
            const result = await client.query(query);
            result.rows.forEach(w => items.push(w.word));
        });
        return items;
    }
}

class Definition {
    /**
     * @param {number} [number]
     * @param {string} [wordtype]
     * @param {string} [definition]
     */
    constructor(number, wordtype, definition) {
        this.number = number;
        this.wordtype = wordtype;
        this.definition = definition;
    }
}

export default Word;
