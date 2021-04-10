import { GraphQLServer } from "graphql-yoga";

// Type definitions
const typeDefs = `
    type Query {
        hello: String!
        me: User!
    }

    type User {
      id: String!
      name: String!
      email: String!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "Hello From Basic";
    },
  },
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.start(() => {
  console.log("Server is running localhost:4000");
});
