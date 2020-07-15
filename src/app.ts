import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';

const app = new Koa();
const router = new KoaRouter();
const PORT = 3000;

// koaBody is needed just for POST.
app.use(koaBody());

router.get('/', (ctx) => {
  ctx.body = 'hello!';
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
