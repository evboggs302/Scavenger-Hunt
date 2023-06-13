import TeamModel from "../../models/teams";
import {
  CreateMultTeamsInput,
  CreateSingleTeamInput,
  DeleteTeamInput,
  Resolvers,
  UpdateTeamInput,
} from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/createBsonObjectId";
import { createErrEvent } from "../../utils/eventLogHelpers";

const teamResolver: Resolvers = {
  Query: {
    getTeamsByHuntId: (_, args: { h_id: string }) => {
      const h_id = createBsonObjectId(args.h_id);
      const teams = TeamModel.find({ hunt_id: h_id }).exec();
      return teams;
    },
  },
  Mutation: {
    createSingleTeam: async (_, args: { input: CreateSingleTeamInput }) => {
      const { h_id, members, device_number } = args.input;
      const id = createBsonObjectId(h_id);
      const team = new TeamModel({
        hunt_id: id,
        members,
        device_number,
      });
      await team.save();

      return await TeamModel.find({ hunt_id: id }).exec();
    },
    createMultipleTeams: async (_, args: { input: CreateMultTeamsInput }) => {
      try {
        const { h_id, teams } = args.input;
        const hunt_id = createBsonObjectId(h_id);
        const mappedTeams = teams.map((team) => ({ hunt_id, ...team }));

        await TeamModel.insertMany(mappedTeams);

        return await TeamModel.find({ hunt_id }).exec();
      } catch (err) {
        createErrEvent({ location: "createMultipleTeams", err });
      }
    },
    updateTeam: async (_, args: { input: UpdateTeamInput }) => {
      try {
        const { input } = args;
        const _id = createBsonObjectId(input.team_id);
        const hunt_id = createBsonObjectId(input.hunt_id);

        return await TeamModel.updateOne({ _id }, { ...input })
          .exec()
          .find({ hunt_id })
          .exec();
      } catch (err) {
        createErrEvent({ location: "updateTeam", err });
      }
    },
    deleteTeam: async (_, args: { input: DeleteTeamInput }) => {
      try {
        const { team_id } = args.input;
        const _id = createBsonObjectId(team_id);

        return await TeamModel.deleteOne({ _id });
      } catch (err) {
        createErrEvent({ location: "deleteTeam", err });
      }
    },
  },
};

export default teamResolver;
