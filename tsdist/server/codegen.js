"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
            },
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};
exports.default = config;
