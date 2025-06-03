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
        contextType: "../types/ApolloServerContextType#ApolloServerContext", // Path to your context type
        dedupeFragments: true,
        preResolveTypes: true,
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
        useIndexSignature: true,
        // mappers: {
        //   StripeSubscription: "stripe#Stripe.Subscription",
        //   StripeCharge: "stripe#Stripe.Charge",
        //   StripePaymentIntent: "stripe#Stripe.PaymentIntent",
        // },
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
