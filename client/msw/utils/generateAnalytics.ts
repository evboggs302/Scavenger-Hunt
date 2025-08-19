import { Analytics } from "@generated/graphql";

export const generateAnalytics = (): Analytics => {
  return {
    __typename: "Analytics",
    total_responses: 5,
    avg_response_time: 120_000,
    rejection_ratio: 2.8,
  };
};
