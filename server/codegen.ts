import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/**/*.graphql",
  generates: {
    "./generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-mongodb",
        "typescript-operations",
        "fragment-matcher",
      ],
      config: {
        dedupeFragments: true,
        preResolveTypes: true,
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
        useIndexSignature: true,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
