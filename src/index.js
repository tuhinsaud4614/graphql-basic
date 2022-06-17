import { createServer, renderGraphiQL } from "@graphql-yoga/node";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const server = createServer({
  schema: {
    typeDefs: typeDefs,
    resolvers: resolvers,
  },
  renderGraphiQL,
});

(async () => {
  await server.start();
})();
