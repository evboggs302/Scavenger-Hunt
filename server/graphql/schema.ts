import "graphql-import-node";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as UserTypeDefs from "./Users/Users.graphql";
import * as ClueTypeDefs from "./Clues/Clues.graphql";
import UserResolver from "./Users/userResolver";
import ClueResolver from "./Clues/clueResolver";
import { GraphQLSchema } from "graphql";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [UserTypeDefs, ClueTypeDefs],
  resolvers: [UserResolver, ClueResolver],
});

export default schema;
