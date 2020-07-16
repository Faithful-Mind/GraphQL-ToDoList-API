import { prop, getModelForClass } from '@typegoose/typegoose';

export class Todo {
  @prop({ required: true })
  content!: string;

  @prop({ default: false })
  isDone?: boolean;
}

export const Todos = getModelForClass(Todo);
