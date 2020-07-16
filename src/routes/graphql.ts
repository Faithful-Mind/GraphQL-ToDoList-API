import { ApolloServer, gql, IResolvers } from 'apollo-server-koa';
import { Todos } from '../models/todo';

// Mongoose has a `.id` getter which points to `._id` of the document.
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Todo {
    id: String
    isDone: Boolean
    content: String
  }
  type Query {
    todos(userId: Int): [Todo]
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
    todos: () => Todos.find(),
  },
  Mutation: {
    createTodo: (root, { content, isDone }) => (
      new Todos({ content, isDone }).save()
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

const server = new ApolloServer({ typeDefs, resolvers });

export default server.getMiddleware();
