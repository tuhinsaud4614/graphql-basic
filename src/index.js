import { GraphQLServer } from "graphql-yoga";
import { v4 } from "uuid";

const users = [
  {
    id: "1",
    name: "Andrew",
    email: "andrew@example.com",
    age: 24,
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@example.com",
    age: 25,
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com",
    age: 26,
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

    type Mutation {
      createUser(data: CreateUserInput): User!
      createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    }

    input CreateUserInput {
      name: String!
      email: String!
      age: Int
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
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

  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);
      if (emailTaken) {
        throw new Error("Email Taken!");
      }

      const user = {
        id: v4(),
        name: args.data.name,
        email: args.data.email,
        age: args.data.age,
      };

      users.push(user);
      return user;
    },

    createPost(parent, args, ctx, info) {
      const userExist = users.some((user) => user.id === args.author);

      if (!userExist) {
        throw new Error("User not found");
      }

      const post = {
        id: v4(),
        title: args.title,
        body: args.body,
        published: args.author,
        author: args.author,
      };
      posts.push(post);
      return post;
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
