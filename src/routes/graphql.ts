import { ApolloServer, gql, IResolvers } from 'apollo-server-koa';
import { Todos } from '../models/todo';

// Mongoose has a `.id` getter which points to `._id` of the document.
// Query schema needs at least 1 parameter or parse error.
const typeDefs = gql`
  type Todo {
    id: String
    isDone: Boolean
    content: String
  }
  type Query {
    todos(userId: String): [Todo]
  }
  type Mutation {
    createTodo(content: String!, isDone: Boolean): Todo
    updateTodo(id: String!, content: String, isDone: Boolean): Boolean
    removeTodo(id: String!): Boolean
  }
`;

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    todos: (root, args, { ctx }) => Todos.find({ userId: ctx.state.jwtdata.userId }),
  },
  Mutation: {
    createTodo: (root, { content, isDone }, { ctx }) => (
      new Todos({ userId: ctx.state.jwtdata.userId, content, isDone }).save()
    ),
    updateTodo: async (root, { id, content, isDone }) => {
      const todo = await Todos.findOne({ _id: id });
      return todo && Object.assign(todo, { content, isDone }) && todo.save().then(Boolean);
    },
    removeTodo: (root, { id }) => (
      Todos.deleteOne({ _id: id }).then((res) => Boolean(res.deletedCount))
    ),
  },
};

const server = new ApolloServer({ typeDefs, resolvers, context: ({ ctx }) => ({ ctx }) });

export default server.getMiddleware();
