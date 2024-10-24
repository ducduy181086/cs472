import express from 'express';

import * as controller from '../controllers/words.js';

const router = express.Router();

router.route('/popular')
    .get(controller.loadRecent);
router.route('/:q/definitions')
    .get(controller.findWord);
router.route('/:q/example')
    .get(controller.getExample);

export default router;
