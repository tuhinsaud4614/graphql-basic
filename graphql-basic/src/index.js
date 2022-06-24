import { createPubSub, createServer, renderGraphiQL } from "@graphql-yoga/node";
import db from "./db";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const pubSub = createPubSub();

const server = createServer({
  schema: {
    typeDefs: typeDefs,
    resolvers: resolvers,
  },
  context: { db, pubSub },
  renderGraphiQL,
});

(async () => {
  await server.start();
})();
