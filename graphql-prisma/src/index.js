import { createPubSub, createServer, renderGraphiQL } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const pubSub = createPubSub();
const prisma = new PrismaClient();
const server = createServer({
  schema: {
    typeDefs: typeDefs,
    resolvers: resolvers,
  },
  renderGraphiQL: renderGraphiQL,
  context: {
    prisma,
    pubSub,
  },
});

(async () => {
  await server.start();
})();
