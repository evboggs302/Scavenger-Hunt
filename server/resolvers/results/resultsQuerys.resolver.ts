import {
  FilterSource,
  type CluePayload,
  type Hunt,
  type Resolvers,
  type ResultsFilters,
  type Team,
} from "@generated/graphql";
import { calculateAverageResponseTime } from "./calculateAverageResponseTime";
import { calculateRejectionRate } from "./calculateRejectionRate";

const resolver: Resolvers = {
  Query: {
    getResults: async (_parent: unknown, { hunt_id, filters }) => {
      const finalFilters = filters || [];

      const avgResponseTime: number = await calculateAverageResponseTime({
        filters: finalFilters,
        huntId: hunt_id,
      });

      const rejectionRatio: number = await calculateRejectionRate({
        filters: finalFilters,
        huntId: hunt_id,
      });

      return {
        __typename: "Results",
        avg_response_time: avgResponseTime,
        rejection_ratio: rejectionRatio,
      };
    },
  },
  Hunt: {
    results: async ({ _id }: Hunt) => {
      const avgResponseTime: number = await calculateAverageResponseTime({
        filters: [],
        huntId: _id,
      });

      const rejectionRatio: number = await calculateRejectionRate({
        filters: [],
        huntId: _id,
      });

      return {
        __typename: "Results",
        avg_response_time: avgResponseTime,
        rejection_ratio: rejectionRatio,
      };
    },
  },
  Team: {
    results: async ({ hunt_id, _id }: Team) => {
      const finalFilters: ResultsFilters[] = [
        {
          source: FilterSource.Team,
          value: _id,
        },
      ];

      const avgResponseTime: number = await calculateAverageResponseTime({
        filters: finalFilters,
        huntId: hunt_id,
      });

      const rejectionRatio: number = await calculateRejectionRate({
        filters: finalFilters,
        huntId: hunt_id,
      });

      return {
        __typename: "Results",
        avg_response_time: avgResponseTime,
        rejection_ratio: rejectionRatio,
      };
    },
  },
  CluePayload: {
    results: async ({ _id, hunt_id }: CluePayload) => {
      const finalFilters: ResultsFilters[] = [
        {
          source: FilterSource.Clue,
          value: _id,
        },
      ];

      const avgResponseTime: number = await calculateAverageResponseTime({
        filters: finalFilters,
        huntId: hunt_id,
      });

      const rejectionRatio: number = await calculateRejectionRate({
        filters: finalFilters,
        huntId: hunt_id,
      });

      return {
        __typename: "Results",
        avg_response_time: avgResponseTime,
        rejection_ratio: rejectionRatio,
      };
    },
  },
};

export default { ...resolver };
