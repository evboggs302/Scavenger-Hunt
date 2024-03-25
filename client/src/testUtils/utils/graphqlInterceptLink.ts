import { graphql } from "msw";

export const graphqlInterceptLink = graphql.link(
  "http://localhost:22357/graphql"
);
