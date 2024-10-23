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
            const query = `SELECT * FROM entries WHERE LOWER(word) LIKE $1;`;
            const result = await client.query(query, [word]);
            result.rows.forEach((r, i) => items.push(new Definition(i + 1, r.wordtype, r.definition)));

            const lastRecordQuery = `SELECT * FROM recententries ORDER BY uId DESC LIMIT 1;`;
            const lastRecordResult = await client.query(lastRecordQuery);
            if (lastRecordResult.rows[0].word != word) {
                const deleteOneCmd = `DELETE FROM recententries WHERE LOWER(word) LIKE $1`;
                const deleteOneResult = await client.query(deleteOneCmd, [word]);

                const insCmd = `INSERT INTO recententries (word) VALUES ($1) RETURNING *;`;
                const insResult = await client.query(insCmd, [word]);

                const deleteCmd = `
                    WITH entries_to_delete AS (
                        SELECT uId
                        FROM recententries
                        ORDER BY uId DESC
                        OFFSET $1
                    )
                    DELETE FROM recententries
                    WHERE uId IN (SELECT uId FROM entries_to_delete);`;
                const deleteResult = await client.query(deleteCmd, [process.env.RECENT_AMOUNT]);
            }
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
        const items = []
        await dbContext("getRecentWords", async (client) => {
            const query = `SELECT * FROM recententries ORDER BY uId DESC;`;
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
