import KoaRouter from 'koa-router';
import graphql from './graphql';

const router = new KoaRouter();

router.get('/', (ctx) => {
  ctx.body = 'hello!';
});

router.get('/graphql', graphql);
router.post('/graphql', graphql);

export default router;
