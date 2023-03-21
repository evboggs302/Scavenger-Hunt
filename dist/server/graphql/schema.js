"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const schema_1 = require("@graphql-tools/schema");
const UserTypeDefs = require("./Users/Users.graphql");
const ClueTypeDefs = require("./Clues/Clues.graphql");
const userResolver_1 = require("./Users/userResolver");
const clueResolver_1 = require("./Clues/clueResolver");
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [UserTypeDefs, ClueTypeDefs],
    resolvers: [userResolver_1.default, clueResolver_1.default],
});
exports.default = schema;
