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
import { HuntModel } from "@models/hunts";
import {
  throwResolutionError,
  throwServerError,
} from "@utils/apolloErrorHandlers";
import { fetchResponseTotals } from "./fetchResponseTotals";

const resolver: Resolvers = {
  Query: {
    getResults: async (
      _parent: unknown,
      { hunt_id, filters },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt = await HuntModel.findById(hunt_id).exec();

        if (!hunt) {
          return throwResolutionError({
            location: name?.value,
            message: "Unable to find hunt.",
          });
        }

        return {
          ...hunt.transformWithTypename(),
        };
      } catch (err) {
        return throwServerError({
          message: "Unable to get hunts at the moment",
          location: name?.value,
          err,
        });
      }
    },
  },
  Hunt: {
    analytics: async ({ _id }: Hunt) => {
      const [avgResponseTime, rejectionRatio, responseTotal] =
        await Promise.all([
          calculateAverageResponseTime({
            filters: [],
            huntId: _id,
          }),
          calculateRejectionRate({
            filters: [],
            huntId: _id,
          }),
          fetchResponseTotals({
            filters: [],
            huntId: _id,
          }),
        ]);

      return {
        __typename: "Analytics",
        avg_response_time: avgResponseTime,
        rejection_ratio: rejectionRatio,
        total_responses: responseTotal,
      };
    },
  },
  Team: {
    analytics: async ({ hunt_id, _id }: Team) => {
      const finalFilters: ResultsFilters[] = [
        {
          source: FilterSource.Team,
          value: _id,
        },
      ];

      const [avgResponseTime, rejectionRatio, responseTotal] =
        await Promise.all([
          calculateAverageResponseTime({
            filters: finalFilters,
            huntId: hunt_id,
          }),
          calculateRejectionRate({
            filters: finalFilters,
            huntId: hunt_id,
          }),
          fetchResponseTotals({
            filters: finalFilters,
            huntId: hunt_id,
          }),
        ]);

      return {
        __typename: "Analytics",
        avg_response_time: avgResponseTime,
        rejection_ratio: rejectionRatio,
        total_responses: responseTotal,
      };
    },
  },
  CluePayload: {
    analytics: async ({ _id, hunt_id }: CluePayload) => {
      const finalFilters: ResultsFilters[] = [
        {
          source: FilterSource.Clue,
          value: _id,
        },
      ];

      const [avgResponseTime, rejectionRatio, responseTotal] =
        await Promise.all([
          calculateAverageResponseTime({
            filters: finalFilters,
            huntId: hunt_id,
          }),
          calculateRejectionRate({
            filters: finalFilters,
            huntId: hunt_id,
          }),
          fetchResponseTotals({
            filters: finalFilters,
            huntId: hunt_id,
          }),
        ]);

      return {
        __typename: "Analytics",
        avg_response_time: avgResponseTime,
        rejection_ratio: rejectionRatio,
        total_responses: responseTotal,
      };
    },
  },
};

export default { ...resolver };
