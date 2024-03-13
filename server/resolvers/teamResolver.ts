import TeamModel from "../models/teams";
import ResponseModel from "../models/responses";
import {
  CreateMultipleTeamsInput,
  CreateSingleTeamInput,
  DeleteTeamInput,
  Resolvers,
  Team,
  UpdateTeamInput,
} from "../generated/graphql";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import { throwResolutionError } from "../utils/eventLogHelpers";
import { returnedItems } from "../utils/returnedItems";

export const teamResolver: Resolvers = {
  Query: {
    getTeamsByHuntId: async (_: unknown, args: { h_id: string }) => {
      const h_id = createBsonObjectId(args.h_id);
      return await TeamModel.find({ hunt_id: h_id });
    },
  },
  Mutation: {
    createSingleTeam: async (
      _: unknown,
      args: { input: CreateSingleTeamInput }
    ) => {
      const { h_id, members, device_number } = args.input;
      const id = createBsonObjectId(h_id);
      const tm = new TeamModel({
        hunt_id: id,
        members,
        device_number,
      });
      await tm.save();

      const team = await TeamModel.findOne({ hunt_id: id }).exec();
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
      args: { input: CreateMultipleTeamsInput }
    ) => {
      try {
        const { h_id, teams: tms } = args.input;
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
    updateTeam: async (_: unknown, args: { input: UpdateTeamInput }) => {
      const { input } = args;
      const { team_id } = input;
      const _id = createBsonObjectId(team_id);

      const updatedTeam = await TeamModel.updateOne({ _id }, { ...input })
        .findById(_id)
        .exec();

      if (!updatedTeam) {
        return throwResolutionError({
          location: "updateTeam",
          err: null,
          message: "Failed to update or find the specified team.",
        });
      }

      return updatedTeam.toObject();
    },
    deleteTeam: async (_: unknown, args: { input: DeleteTeamInput }) => {
      try {
        const { team_id } = args.input;
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
