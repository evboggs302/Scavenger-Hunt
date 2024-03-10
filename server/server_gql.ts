import * as mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema";
import config from "./config";
import { apolloServerContext } from "./utils/apolloServerContext";
import { ListenOptions } from "net";
// import { JwtPayload } from "jsonwebtoken";

const { MONGO_URI, PORT } = config;

export async function startServer(
  listenOptions: ListenOptions = { port: PORT }
) {
  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    context: apolloServerContext,
    listen: listenOptions,
  });
  config.SERVER_URL = url;
  console.log(`🚀 ApolloServer ready at: ${url}`);

  return { server, url };
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
    return startServer();
  })
  .catch((err) => console.log(`🚫 Mongo failed\n`));
