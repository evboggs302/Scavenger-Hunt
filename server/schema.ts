import "graphql-import-node";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as ErrorTypeDefs from "./graphql/Errors.graphql";
import * as ClueTypeDefs from "./graphql/Clues.graphql";
import { clueResolver } from "./resolvers/clueResolver";
import * as HuntTypeDefs from "./graphql/Hunts.graphql";
import { huntResolver } from "./resolvers/huntResolver";
import * as ResponseTypeDefs from "./graphql/Responses.graphql";
import { responseResolver } from "./resolvers/responseResolver";
import * as TeamTypeDefs from "./graphql/Teams.graphql";
import { teamResolver } from "./resolvers/teamResolver";
import * as UserTypeDefs from "./graphql/Users.graphql";
import { userResolver } from "./resolvers/userResolver";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    ErrorTypeDefs,
    UserTypeDefs,
    HuntTypeDefs,
    TeamTypeDefs,
    ClueTypeDefs,
    ResponseTypeDefs,
  ],
  resolvers: [
    userResolver,
    huntResolver,
    teamResolver,
    clueResolver,
    responseResolver,
  ],
});

export default schema;
