"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const mongoose = require("mongoose");
const http_1 = require("http");
const schema_1 = require("./graphql/schema");
const config_1 = require("./config");
const { MONGO_URI, PORT } = config_1.default;
const app = express();
const httpServer = (0, http_1.createServer)(app);
const server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
});
async function startServer() {
    const server = new apollo_server_express_1.ApolloServer({ schema: schema_1.default });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
}
// MONGODB Connection
console.log(MONGO_URI);
mongoose
    .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
    console.log(`✅ Connected to Database\n`);
    startServer();
    return app.listen({ port: PORT }, () => {
        console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
    });
})
    // .then((str) => console.log(str))
    .catch((err) => console.log(`🚫 Mongo failed\n`));
