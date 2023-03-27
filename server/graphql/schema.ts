import "graphql-import-node";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as ClueTypeDefs from "./Clues/Clues.graphql";
import ClueResolver from "./Clues/clueResolver";
// import * as EventLogTypeDefs from "./Event_Logs/Event_Logs.graphql";
// import EventLogResolver from "./Event_Logs/event_logResolver";
import * as HuntTypeDefs from "./Hunts/Hunts.graphql";
import HuntResolver from "./Hunts/huntResolver";
// import * as ResponseTypeDefs from "./Responses/Responses.graphql";
// import ResponseResolver from "./Responses/responseResolver";
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
    // EventLogTypeDefs,
    // ResponseTypeDefs,
  ],
  resolvers: [
    UserResolver,
    HuntResolver,
    TeamResolver,
    ClueResolver,
    // EventLogResolver,
    // ResponseResolver,
  ],
});

export default schema;
