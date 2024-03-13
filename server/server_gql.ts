import mongoose from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import config from "./config";
import schema from "./schema";
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
  app.get("/healthz", (_, res) =>
    res.send({
      status: 200,
      message:
        'This end point is only for doing a "health check", making sure the server is running and listening.',
    })
  );

  // receive twilio messages
  // app.post("/sms", findActiveTeamByDevice, saveSMS, saveMMS);

  // MONGODB Connection
  mongoose
    .connect(MONGO_URI)
    .then(async () => {
      await new Promise<void>((resolve) => {
        httpServer.listen(listenOptions, resolve);
        console.log(`\n✅ Connected to database. Server started.\n`);
      });
    })
    .catch((err) =>
      console.log(`\n🚫 Failed to connect to MongoDB. Server did not start.\n`)
    );
}

startServer();
