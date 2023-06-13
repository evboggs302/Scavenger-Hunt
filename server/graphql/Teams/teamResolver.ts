import TeamModel from "../../models/teams";
import {
  CreateMultTeamsInput,
  CreateSingleTeamInput,
  Resolvers,
} from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/createBsonObjectId";

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
    // createMultipleTeams: (_, args: { input: CreateMultTeamsInput }) => {
    // try {
    // } catch (err) {
    //   createErrEvent({ location: "", err });
    // }
    // },
  },
};

export default teamResolver;
