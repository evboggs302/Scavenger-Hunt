import "graphql-import-node";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { clueResolver } from "./resolvers/clueResolver";
import { huntResolver } from "./resolvers/huntResolver";
import { responseResolver } from "./resolvers/responseResolver";
import { teamResolver } from "./resolvers/teamResolver";
import { userResolver } from "./resolvers/userResolver";
import * as ClueTypeDefs from "./graphql/Clues.graphql";
import * as HuntTypeDefs from "./graphql/Hunts.graphql";
import * as ResponseTypeDefs from "./graphql/Responses.graphql";
import * as TeamTypeDefs from "./graphql/Teams.graphql";
import * as UserTypeDefs from "./graphql/Users.graphql";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
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
