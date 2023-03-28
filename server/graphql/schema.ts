import "graphql-import-node";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as ClueTypeDefs from "./Clues/Clues.graphql";
import ClueResolver from "./Clues/clueResolver";
import * as HuntTypeDefs from "./Hunts/Hunts.graphql";
import HuntResolver from "./Hunts/huntResolver";
import * as ResponseTypeDefs from "./Responses/Responses.graphql";
import ResponseResolver from "./Responses/responseResolver";
import * as TeamTypeDefs from "./Teams/Teams.graphql";
import TeamResolver from "./Teams/teamResolver";
import * as UserTypeDefs from "./Users/Users.graphql";
import UserResolver from "./Users/userResolver";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    UserTypeDefs,
    HuntTypeDefs,
    TeamTypeDefs,
    ClueTypeDefs,
    ResponseTypeDefs,
  ],
  resolvers: [
    UserResolver,
    HuntResolver,
    TeamResolver,
    ClueResolver,
    ResponseResolver,
  ],
});

export default schema;
