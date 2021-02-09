import { Router } from 'express';

import { createQuestionList } from '../controllers/question';

const router = Router();

router.post('/', createQuestionList);

export default router;
