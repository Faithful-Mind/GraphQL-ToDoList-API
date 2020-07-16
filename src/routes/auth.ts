import { IMiddleware } from 'koa-router';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const auth: IMiddleware = async (ctx) => {
  const payload = { userId: new mongoose.Types.ObjectId() };
  ctx.body = jwt.sign(payload, 'graphql-todolist-api');
};

export default auth;
