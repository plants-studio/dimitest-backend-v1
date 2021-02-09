import { Router } from 'express';

import question from './question';

const router = Router();

router.use('/question', question);

export default router;
