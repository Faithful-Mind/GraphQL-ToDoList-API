import KoaRouter from 'koa-router';
import jwt from 'koa-jwt';

import graphql from './graphql';
import auth from './auth';

const router = new KoaRouter();

router.get('/', (ctx) => {
  ctx.body = 'hello!';
});

router.get('/auth', auth);

router.get('/graphql', graphql);

router.use(jwt({ secret: 'graphql-todolist-api', key: 'jwtdata' }));
router.post('/graphql', graphql);

export default router;
