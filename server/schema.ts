import path from "path";
import { GraphQLSchema } from "graphql";
import { loadSchemaSync } from "@graphql-tools/load";
import { loadFilesSync } from "@graphql-tools/load-files";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge";

export const schema: GraphQLSchema = loadSchemaSync("./graphql/**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

export const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

export const schemaWithResolvers: GraphQLSchema = addResolversToSchema({
  schema,
  resolvers,
});
