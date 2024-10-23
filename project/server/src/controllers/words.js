import Word from '../models/words.js';

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function findWord(req, res, next) {
    (async () => {
        const { q } = req.params;
        const definitions = await Word.getDefinitions(q);
        res.status(200).json(definitions);
    })();
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function loadRecent(req, res, next) {
    (async () => {
        const words = await Word.getRecentWords();
        res.status(200).json(words);
    })();
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function getExample(req, res, next) {
    (async () => {
        const { q } = req.params;
        const example = await Word.getExample(q);
        res.status(200).json({ example: example });
    })();
}
