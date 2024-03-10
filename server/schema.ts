import "graphql-import-node";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as ClueTypeDefs from "./graphql/Clues.graphql";
import ClueResolver from "./resolvers/clueResolver";
import * as HuntTypeDefs from "./graphql/Hunts.graphql";
import HuntResolver from "./resolvers/huntResolver";
import * as ResponseTypeDefs from "./graphql/Responses.graphql";
import ResponseResolver from "./resolvers/responseResolver";
import * as TeamTypeDefs from "./graphql/Teams.graphql";
import TeamResolver from "./resolvers/teamResolver";
import * as UserTypeDefs from "./graphql/Users.graphql";
import UserResolver from "./resolvers/userResolver";

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
