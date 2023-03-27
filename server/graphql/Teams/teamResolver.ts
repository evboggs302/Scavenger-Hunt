import TeamModel from "../../models/teams";
import {
  CreateMultTeamsInput,
  CreateSingleTeamInput,
  Resolvers,
} from "../../generated/graphql";
import { BsonObjectId } from "../../utils/BsonObjectIdCreater";

const teamResolver: Resolvers = {
  Query: {
    getTeamsByHuntId: (_, args: { h_id: string }) => {
      const h_id = BsonObjectId(args.h_id);
      const teams = TeamModel.find({ hunt_id: h_id }).exec();
      return teams;
    },
  },
  Mutation: {
    createSingleTeam: async (_, args: { input: CreateSingleTeamInput }) => {
      const { h_id, members, device_number } = args.input;
      const id = BsonObjectId(h_id);
      const team = new TeamModel({
        hunt_id: id,
        members,
        device_number,
      });
      await team.save();
      return await TeamModel.find({ hunt_id: id }).exec();
    },
    // createMultipleTeams: (_, args: { input: CreateMultTeamsInput }) => {
    //   const { h_id, members } = args.input;
    // },
  },
};

export default teamResolver;
