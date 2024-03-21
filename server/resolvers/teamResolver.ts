import TeamModel from "../models/teams";
import ResponseModel from "../models/responses";
import { Resolvers, Team } from "../generated/graphql";
import { returnedItems } from "../utils/returnedItems";
import { createBsonObjectId } from "../utils/createBsonObjectId";
import { NotFoundError, UnknownError } from "../utils/apolloErrorHandlers";
import { createDeleteResponse } from "../utils/createDeleteResponse";

export const teamResolver: Resolvers = {
  Query: {
    getTeamsByHuntId: async (_: unknown, { h_id }) => {
      const hunt_id = createBsonObjectId(h_id);
      return await TeamModel.find({ hunt_id });
    },
    getTeam: async (_: unknown, { id }, _ctxt, { operation }) => {
      try {
        const team = await TeamModel.findById(id);

        if (!team) {
          return await NotFoundError(
            "Unable to find the team.",
            operation.name?.value
          );
        }

        return {
          __typename: "Team",
          ...team.toObject(),
        };
      } catch {
        return await UnknownError(
          "Unable to find the team",
          operation.name?.value
        );
      }
    },
  },
  Mutation: {
    createSingleTeam: async (
      _: unknown,
      { input: { h_id, members, device_number } },
      _ctxt,
      { operation }
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
        return await NotFoundError(
          "Unable to create the team.",
          operation.name?.value
        );
      }

      return {
        __typename: "Team",
        ...team.toObject(),
      };
    },
    createMultipleTeams: async (
      _: unknown,
      { input: { h_id, teams: tms } },
      _ctxt,
      { operation }
    ) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const mappedTeams = tms.map((tm) => ({ hunt_id, ...tm }));

        await TeamModel.insertMany(mappedTeams);
        const teams = await TeamModel.find({ hunt_id }).exec();
        return teams.map(returnedItems);
      } catch {
        const err = await UnknownError(
          "Unable to create multiple teams.",
          operation.name?.value
        );
        return [err];
      }
    },
    updateTeam: async (_: unknown, { input }, _ctxt, { operation }) => {
      try {
        const { team_id } = input;
        const _id = createBsonObjectId(team_id);

        await TeamModel.updateOne({ _id }, { ...input }).exec();
        const updatedTeam = await TeamModel.findById(_id).exec();

        if (!updatedTeam) {
          return await UnknownError(
            "Unable to find the team",
            operation.name?.value
          );
        }

        return {
          __typename: "Team",
          ...updatedTeam.toObject(),
        };
      } catch {
        return await UnknownError(
          "Unable to update the team.",
          operation.name?.value
        );
      }
    },
    deleteTeam: async (
      _: unknown,
      { input: { team_id } },
      _ctxt,
      { operation }
    ) => {
      try {
        const _id = createBsonObjectId(team_id);
        const { deletedCount } = await TeamModel.deleteOne({ _id }).exec();

        return createDeleteResponse(deletedCount === 1);
      } catch {
        return await UnknownError(
          "Unable to delete team.",
          operation.name?.value
        );
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
