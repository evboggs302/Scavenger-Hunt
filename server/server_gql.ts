import mongoose from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import schema from "./schema";
import config from "./config";
import { apolloServerMiddlewareOptions } from "./utils/apolloServerMiddlewareOptions";
import { ListenOptions } from "net";
// import { JwtPayload } from "jsonwebtoken";

const { MONGO_URI, PORT } = config;

export async function startServer(
  listenOptions: ListenOptions = { port: PORT }
) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, apolloServerMiddlewareOptions)
  );

  // health check
  app.get("/healthz", (_, res) => res.send({ status: 200 }));

  // receive twilio messages
  // app.post("/sms", findActiveTeamByDevice, saveSMS, saveMMS);

  // MONGODB Connection
  mongoose
    .connect(MONGO_URI)
    .then(async () => {
      console.log(`✅ Connected to Database`);
      await new Promise<void>((resolve) =>
        httpServer.listen(listenOptions, resolve)
      );
    })
    .catch((err) => console.log(`🚫 Mongo failed\n`));
}

startServer();
