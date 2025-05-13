import mongoose from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";
import config from "./config";
import type { ListenOptions } from "net";
import { schemaWithResolvers } from "./schema";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { apolloServerMiddlewareOptions } from "./utils/serverSetup/apolloServerMiddlewareOptions";
import { responseController } from "./controllers/responseController";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { createSubscriptionContext } from "./utils/serverSetup/subscriptionContext";

const { MONGO_URI, PORT, CLIENT_URL, SERVER_URL_GQL, SERVER_URL_SUBSCRIPTION } =
  config;
const { findActiveTeamByDevice, saveSMS, saveMMS } = responseController;

export const startServer = async (
  MongoUri: string = MONGO_URI,
  listenOptions: ListenOptions = { port: PORT }
) => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    introspection: SERVER_URL_GQL.includes("localhost"),
    csrfPrevention: !SERVER_URL_GQL.includes("localhost"),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscriptions",
  });

  // Hand in the schema we just created and have the WebSocketServer start listening.
  const serverCleanup = useServer(
    {
      schema: schemaWithResolvers,
      context: createSubscriptionContext,
    },
    wsServer
  );

  await server.start();

  // GRAPHQL ENDPOINT
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: [
        "http://localhost:8080", // vite preview build
        CLIENT_URL,
        SERVER_URL_GQL,
        SERVER_URL_SUBSCRIPTION,
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
  app.post("/twilio/sms", findActiveTeamByDevice, saveSMS, saveMMS);

  try {
    await mongoose.connect(MongoUri);

    await new Promise<void>((resolve) => {
      return httpServer.listen(listenOptions, () => {
        console.log(
          `
✅ Connected to database.
Server started listening on ${SERVER_URL_GQL}
Socket started listening on ${SERVER_URL_SUBSCRIPTION}\n`
        );
        resolve();
      });
    });

    return app;
  } catch {
    console.log(`\n🚫 Failed to connect to MongoDB. Server did not start.\n`);
    return null;
  }
};

startServer();
