import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../server/graphql/**/*.graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "fragment-matcher",
        "typed-document-node",
      ],
      config: {
        dedupeFragments: true,
        preResolveTypes: true,
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
      },
    },
    "graphql.schema.json": {
      plugins: ["introspection"],
    },
    "src/generated/apolloClientHelpers.ts": {
      plugins: ["typescript-apollo-client-helpers"],
    },
  },
};

export default config;
