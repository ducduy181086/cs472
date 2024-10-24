import express from 'express';

import * as controller from '../controllers/words.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/words/popular:
 *   get:
 *     summary: Returns the most popular words.
 *     responses:
 *       200:
 *         description: Success
 */
router.route('/popular')
    .get(controller.loadRecent);

/**
 * @swagger
 * /api/v1/words/{q}/definitions:
 *   get:
 *     summary: Returns the word definitions.
 *     parameters:
 *       - in: path
 *         name: q
 *         schema:
 *           type: string
 *         description: The word
 *     responses:
 *       200:
 *         description: Success
 */
router.route('/:q/definitions')
    .get(controller.findWord);

/**
 * @swagger
 * /api/v1/words/{q}/example:
 *   get:
 *     summary: Returns the example of word.
 *     parameters:
 *       - in: path
 *         name: q
 *         schema:
 *           type: string
 *         description: The word
 *     responses:
 *       200:
 *         description: Success
 */
router.route('/:q/example')
    .get(controller.getExample);

export default router;
