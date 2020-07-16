import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import mongoose from 'mongoose';

import router from './routes';

const app = new Koa();
const PORT = 3000;

// koaBody is needed just for POST.
app.use(koaBody());

mongoose.connect('mongodb://localhost:27017/graphql-todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(router.routes());
app.use(router.allowedMethods());
export default app.listen(PORT);
