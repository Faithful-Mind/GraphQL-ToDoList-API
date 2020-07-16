import { prop, getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Todo {
  @prop({ required: true })
  userId!: mongoose.Types.ObjectId;

  @prop({ required: true })
  content!: string;

  @prop({ default: false })
  isDone?: boolean;
}

export const Todos = getModelForClass(Todo);
