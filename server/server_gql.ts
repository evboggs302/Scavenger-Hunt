import mongoose from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";
import config from "./config";
import { ListenOptions } from "net";
import { schemaWithResolvers } from "./schema";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { apolloServerMiddlewareOptions } from "./utils/apolloServerMiddlewareOptions";

const { MONGO_URI, PORT, GQL_SERVER_URL, CLIENT_URL } = config;

export const startServer = async (
  MongoUri: string = MONGO_URI,
  listenOptions: ListenOptions = { port: PORT }
) => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: GQL_SERVER_URL.includes("localhost"),
    csrfPrevention: !GQL_SERVER_URL.includes("localhost"),
  });

  await server.start();

  // GRAPHQL ENDPOINT
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: [
        "http://localhost:5173", // vite dev build
        "http://localhost:8080", // vite preview build
        CLIENT_URL,
        "https://studio.apollographql.com",
      ],
    }),
    express.json(),
    expressMiddleware(server, apolloServerMiddlewareOptions)
  );

  // HEALTH CHECK
  app.get("/healthz", (_req, res) =>
    res.send({
      status: 200,
      message:
        'This end point is only for doing a "health check", making sure the server is running and listening.',
    })
  );

  // RECEIVE TWILIO SMS
  // app.post("/twilio/sms", findActiveTeamByDevice, saveSMS, saveMMS);

  try {
    // MONGODB Connection
    await mongoose.connect(MongoUri);

    await new Promise<void>((resolve) => {
      return httpServer.listen(listenOptions, () => {
        console.log(
          `\n✅ Connected to database. Server started listening on ${GQL_SERVER_URL}.\n`
        );
        resolve();
      });
    });

    return app;
  } catch (err) {
    console.log(`\n🚫 Failed to connect to MongoDB. Server did not start.\n`);
    return null;
  }
};

startServer();
