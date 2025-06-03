import { TeamModel } from "@models/teams";
import { Resolvers } from "@generated/graphql";
import { returnedItems } from "@utils/transforms/returnedItems";
import { createBsonObjectId } from "@utils/transforms/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "@utils/apolloErrorHandlers";

const resolver: Resolvers = {
  Mutation: {
    createSingleTeam: async (
      _parent: unknown,
      { input: { hunt_id: h_id, members, device_number } },
      _ctxt,
      { operation: { name } }
    ) => {
      const hunt_id = createBsonObjectId(h_id);
      const team = await TeamModel.create({
        hunt_id,
        members,
        device_number,
      });

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
};

export default { ...resolver };
