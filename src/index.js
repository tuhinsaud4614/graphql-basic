import { createServer, renderGraphiQL } from "@graphql-yoga/node";
import db from "./db";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const server = createServer({
  schema: {
    typeDefs: typeDefs,
    resolvers: resolvers,
  },
  context: { db },
  renderGraphiQL,
});

(async () => {
  await server.start();
})();
