import { GraphQLServer } from "graphql-yoga";

const users = [
  {
    id: "1",
    name: "Andrew",
    email: "andrew@example.com",
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@example.com",
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com",
  },
];

const posts = [
  {
    id: "10",
    title: "GraphQL 101",
    body: "This is how to use GraphQL...",
    published: true,
    author: "1",
  },
  {
    id: "11",
    title: "GraphQL 201",
    body: "This is an GraphQL post...",
    published: false,
    author: "2",
  },
  {
    id: "12",
    title: "Programming Music",
    body: "",
    published: false,
    author: "3",
  },
];

// Type definitions
const typeDefs = `
    type Query {
        greeting(name: String!): String!
        hello: String!
        me: User!
        posts(query: String): [Post!]!
    }

    type User {
      id: ID!
      name: String!
      email: String!
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      return `Hello ${args.name}`;
    },
    hello() {
      return "Hello From Basic";
    },
    me() {
      return {
        id: "123",
        name: "tuhin",
        email: "t@gmail.com",
      };
    },
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;
      return posts.filter((item) => {
        const isTitleMatch = item.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = item.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
  },
  
  Post: {
    author(parent, args, ctx, info) {
      return users.find((item) => {
        return item.id === parent.author;
      });
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
