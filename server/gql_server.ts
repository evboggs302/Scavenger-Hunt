import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import * as mongoose from "mongoose";
import { createServer } from "http";
import schema from "./graphql/schema";
import config from "./config";

const { MONGO_URI, PORT } = config;

const app = express();
const httpServer = createServer(app);

async function startServer() {
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

// MONGODB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`✅ Connected to Database`);
    startServer();
    return app.listen({ port: PORT }, () => {
      console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err) => console.log(`🚫 Mongo failed\n`));
