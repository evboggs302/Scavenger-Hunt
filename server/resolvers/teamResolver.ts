import TeamModel from "../models/teams";
import ResponseModel from "../models/responses";
import { Resolvers, Team } from "../generated/graphql";
import { returnedItems } from "../utils/returnedItems";
import { createBsonObjectId } from "../utils/createBsonObjectId";

export const teamResolver: Resolvers = {
  Query: {
    getTeamsByHuntId: async (_: unknown, { h_id }) => {
      const hunt_id = createBsonObjectId(h_id);
      return await TeamModel.find({ hunt_id });
    },
    getTeam: async (_: unknown, { id }) => {
      try {
        const team = await TeamModel.findById(id);

        if (!team) {
          return throwResolutionError({
            location: "getTeam",
            err: null,
            message: "Failed to find the specified team.",
          });
        }

        return team.toObject();
      } catch (err) {
        return throwResolutionError({
          location: "getTeam",
          err: null,
          message: "Failed to find the specified team.",
        });
      }
    },
  },
  Mutation: {
    createSingleTeam: async (
      _: unknown,
      { input: { h_id, members, device_number } }
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
          location: "createSingleTeam",
          message: "Unable to find team",
          err: null,
        });
      }

      return team.toObject();
    },
    createMultipleTeams: async (
      _: unknown,
      { input: { h_id, teams: tms } }
    ) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const mappedTeams = tms.map((tm) => ({ hunt_id, ...tm }));

        await TeamModel.insertMany(mappedTeams);
        const teams = await TeamModel.find({ hunt_id }).exec();
        return teams.map(returnedItems);
      } catch (err) {
        return throwResolutionError({
          location: "createMultipleTeams",
          message: "Unable to create multiple teams.",
          err,
        });
      }
    },
    updateTeam: async (_: unknown, { input }) => {
      const { team_id } = input;
      const _id = createBsonObjectId(team_id);

      await TeamModel.updateOne({ _id }, { ...input }).exec();
      const updatedTeam = await TeamModel.findById(_id).exec();

      if (!updatedTeam) {
        return throwResolutionError({
          location: "updateTeam",
          err: null,
          message: "Failed to update or find the specified team.",
        });
      }

      return updatedTeam.toObject();
    },
    deleteTeam: async (_: unknown, { input: { team_id } }) => {
      try {
        const _id = createBsonObjectId(team_id);
        const { deletedCount } = await TeamModel.deleteOne({ _id }).exec();

        return deletedCount === 1;
      } catch (err) {
        return throwResolutionError({ location: "deleteTeam", err });
      }
    },
  },
  Team: {
    responses: async (parent: Team) => {
      try {
        const team_id = createBsonObjectId(parent._id);
        return await ResponseModel.find({ team_id });
      } catch (err) {
        return throwResolutionError({ location: "CluePayload.responses", err });
      }
    },
  },
};
