import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import mongoose from 'mongoose';

import { PORT, MONGODB_URL } from '../config';
import router from './routes';

const app = new Koa();

// koaBody is needed just for POST.
app.use(koaBody());

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(router.routes());
app.use(router.allowedMethods());
export default app.listen(PORT);
console.info(`Listening to http://localhost:${PORT} 🚀`);
