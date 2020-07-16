import { IMiddleware } from 'koa-router';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { JWT_SECRET } from '../../config';

const auth: IMiddleware = async (ctx) => {
  const payload = { userId: new mongoose.Types.ObjectId() };
  ctx.body = jwt.sign(payload, JWT_SECRET);
};

export default auth;
