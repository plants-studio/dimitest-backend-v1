import Router from '@koa/router';

import question from './question';

const router = new Router();

router.use('/question', question.routes());

export default router;
