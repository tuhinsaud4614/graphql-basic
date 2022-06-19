import { createServer, renderGraphiQL } from "@graphql-yoga/node";
import prisma from "./prisma";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const server = createServer({
  schema: {
    typeDefs: typeDefs,
    resolvers: resolvers,
  },
  renderGraphiQL: renderGraphiQL,
  context: {
    prisma: prisma,
  },
});

(async () => {
  await server.start();
})();
