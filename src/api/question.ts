import Router from '@koa/router';

import {
  ch1, ch2, ch3, createQuestion, typeResult,
} from '../controllers/question';

const router = new Router();

router.post('/ch1', ch1);
router.post('/ch2', ch2);
router.post('/ch3', ch3);
router.post('/result', typeResult);
router.post('/:key', createQuestion);

export default router;
