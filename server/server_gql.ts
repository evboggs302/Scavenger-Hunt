import * as mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./graphql/schema";
import config from "./config";

const { MONGO_URI, PORT } = config;

async function startServer() {
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });
  console.log(`🚀  ApolloServer ready at: ${url}`);
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
