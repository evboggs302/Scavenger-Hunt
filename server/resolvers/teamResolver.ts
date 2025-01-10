import { TeamModel } from "../models/teams";
import { ResponseModel } from "../models/responses";
import { Resolvers, Team } from "../generated/graphql";
import { returnedItems } from "../utils/transforms/returnedItems";
import { createBsonObjectId } from "../utils/transforms/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "../utils/apolloErrorHandlers";

const teamResolver: Resolvers = {
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
  Mutation: {
    createSingleTeam: async (
      _parent: unknown,
      { input: { hunt_id: h_id, members, device_number } },
      _ctxt,
      { operation: { name } }
    ) => {
      const hunt_id = createBsonObjectId(h_id);
      const tm = new TeamModel({
        hunt_id,
        members,
        device_number,
      });
      await tm.save();

      const team = await TeamModel.findOne({ hunt_id }).exec();
      if (!team) {
        return throwResolutionError({
          message: "Unable to find team.",
          location: name?.value,
        });
      }

      return team.transformWithTypename();
    },
    createMultipleTeams: async (
      _parent: unknown,
      { input: { hunt_id: h_id, teams: tms } },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const mappedTeams = tms.map((tm) => ({ hunt_id, ...tm }));

        await TeamModel.insertMany(mappedTeams, {
          includeResultMetadata: true,
        });

        const teams = await TeamModel.find({ hunt_id }).exec();
        return teams.map(returnedItems);
      } catch {
        return throwServerError({
          message: "Unable to create multiple teams at this time.",
          location: name?.value,
        });
      }
    },
    updateTeam: async (
      _parent: unknown,
      { input },
      _ctxt,
      { operation: { name } }
    ) => {
      const { team_id } = input;
      const _id = createBsonObjectId(team_id);

      const updatedTeam = await TeamModel.findOneAndUpdate(
        { _id },
        { ...input },
        { new: true }
      );

      if (!updatedTeam) {
        return throwResolutionError({
          message: "Unable to update or find the specified team.",
          location: name?.value,
        });
      }

      return updatedTeam.transformWithTypename();
    },
    deleteTeam: async (
      _parent: unknown,
      { team_id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const _id = createBsonObjectId(team_id);
        const { deletedCount } = await TeamModel.deleteOne({ _id }).exec();

        return deletedCount === 1;
      } catch {
        return throwResolutionError({
          message: "Unable to delete teams at the moment.",
          location: name?.value,
        });
      }
    },
    deleteAllTeamsByHuntId: async (
      _parent: unknown,
      { hunt_id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const _id = createBsonObjectId(hunt_id);
        const { deletedCount } = await TeamModel.deleteMany({
          hunt_id: _id,
        }).exec();

        return deletedCount > 0;
      } catch {
        return throwResolutionError({
          message: "Unable to delete teams at the moment.",
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

export default { ...teamResolver };
