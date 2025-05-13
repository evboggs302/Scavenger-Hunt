import { TeamModel } from "../../models/teams";
import { ResponseModel } from "../../models/responses";
import { Resolvers, Team } from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "../../utils/apolloErrorHandlers";

const resolver: Resolvers = {
  Query: {
    getTeamsByHuntId: async (_parent: unknown, { h_id }) => {
      const hunt_id = createBsonObjectId(h_id);
      return await TeamModel.find({ hunt_id });
    },
    getTeam: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const team = await TeamModel.findById(id);

        if (!team) {
          return throwResolutionError({
            message: "Failed to find the specified team.",
            location: name?.value,
          });
        }

        return team.transformWithTypename();
      } catch {
        return throwServerError({
          message: "Unable to get teams at the moment.",
          location: name?.value,
        });
      }
    },
  },
  Team: {
    responses: async (parent: Team) => {
      const team_id = createBsonObjectId(parent._id);
      return await ResponseModel.find({ team_id });
    },
  },
};

export default { ...resolver };
