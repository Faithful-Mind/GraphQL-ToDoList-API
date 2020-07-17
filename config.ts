export const JWT_SECRET = 'graphql-todolist-api';

export const PORT = process.env.PORT || 3000;

const {
  MONGO_SERVER = 'localhost',
  MONGO_PORT = 27017,
  MONGO_DBNAME = 'graphql-todo',
} = process.env;

export const MONGODB_URL = `mongodb://${MONGO_SERVER}:${MONGO_PORT}/${MONGO_DBNAME}`;
