import { Results } from "@generated/graphql";

export const generateResults = (): Results => {
  return {
    __typename: "Results",
    avg_response_time: 120_000,
    rejection_ratio: 2.8,
  };
};
