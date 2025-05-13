import { Resolvers } from "generated/graphql";
import { HuntModel } from "../../../models/hunts";
import { ClueModel } from "../../../models/clues";
import { TeamModel } from "../../../models/teams";
import { ResponseModel } from "../../../models/responses";
import { createBsonObjectId } from "../../../utils/transforms/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "../../../utils/apolloErrorHandlers";
import { activateHunt } from "../activateHunt";
import { markHuntComplete } from "../markHuntComplete";
import { updateHunt } from "../updateHunt";

const resolver: Resolvers = {
  Mutation: {
    activateHunt,
    markHuntComplete,
    updateHunt,
    createHunt: async (
      _parent: unknown,
      { input: { name, start_date, end_date, recall_message } },
      { user },
      { operation: { name: opname } }
    ) => {
      try {
        const h_id = createBsonObjectId();
        await HuntModel.create({
          _id: h_id,
          created_by: user._id,
          name,
          start_date,
          end_date,
          recall_message,
        });

        const createdHunt = await HuntModel.findOne({ _id: h_id }).exec();
        if (!createdHunt) {
          return throwResolutionError({
            message: "Failed to create or find the specified hunt.",
            location: opname?.value,
          });
        }

        return createdHunt.transformWithTypename();
      } catch (err) {
        return throwServerError({
          message: "Unable to create hunts at the moment.",
          location: opname?.value,
          err,
        });
      }
    },
    deleteHuntById: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt_id = createBsonObjectId(id);
        const teamsIDs = (await TeamModel.find({ hunt_id }, "_id").exec()).map(
          (tm) => tm._id
        );

        // delete responses
        const { acknowledged: resDeleteAck } = await ResponseModel.deleteMany({
          team_id: { $in: teamsIDs },
        }).exec();

        // delete teams
        const { acknowledged: teamDeleteAck } = await TeamModel.deleteMany({
          _id: { $in: teamsIDs },
        }).exec();

        // delete clues
        const { acknowledged: clueDeleteAck } = await ClueModel.deleteMany({
          hunt_id,
        }).exec();

        const { deletedCount } = await HuntModel.deleteOne({
          _id: hunt_id,
        }).exec();

        return (
          resDeleteAck && teamDeleteAck && clueDeleteAck && deletedCount === 1
        );
      } catch (err) {
        return throwServerError({
          message: "Unable to delete hunts at this time.",
          location: name?.value,
          err,
        });
      }
    },
  },
};

export default { ...resolver };
