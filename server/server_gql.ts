import mongoose from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";
import config from "./config";
import schema from "./schema";
import { ListenOptions } from "net";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { apolloServerMiddlewareOptions } from "./utils/apolloServerMiddlewareOptions";

const { MONGO_URI, PORT, GQL_SERVER_URL } = config;

export async function startServer(
  listenOptions: ListenOptions = { port: PORT }
) {
  console.log(process.env.CLIENT_URL);
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: process.env.GQL_SERVER_URL?.includes("localhost"),
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: [
        "http://localhost:5173", // vite dev build
        "http://localhost:8080", // vite preview build
        `${process.env.CLIENT_URL}`,
        "https://studio.apollographql.com",
      ],
    }),
    express.json(),
    expressMiddleware(server, apolloServerMiddlewareOptions)
  );

  // health check
  app.get("/healthz", (_, res) =>
    res.send({
      status: 200,
      message:
        'This end point is only for doing a "health check", making sure the server is running and listening.',
    })
  );

  // RECEIVE TWILIO SMS
  // app.post("/twilio/sms", findActiveTeamByDevice, saveSMS, saveMMS);

  // MONGODB Connection
  mongoose
    .connect(MONGO_URI)
    .then(async () => {
      await new Promise<void>((resolve) => {
        httpServer.listen(listenOptions, resolve);
        console.log(
          `\n✅ Connected to database. Server started listening on ${GQL_SERVER_URL}.\n`
        );
      });
    })
    .catch((err) =>
      console.log(`\n🚫 Failed to connect to MongoDB. Server did not start.\n`)
    );
}

startServer();
