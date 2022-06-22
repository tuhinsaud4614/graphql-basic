import { createPubSub, createServer, renderGraphiQL } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import express from "express";
import path from "path";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const app = express();

const pubSub = createPubSub();
const prisma = new PrismaClient();
// const isUserExit = await prisma.user.findUnique({
//   where: { id },
//   select: { avatar: { select: { url: true, id: true } } },
// });

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

app.use("/images", express.static(path.join(process.cwd(), "images")));
app.use("/graphql", server);

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
