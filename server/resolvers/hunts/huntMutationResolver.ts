import { HuntModel } from "../../models/hunts";
import { ClueModel } from "../../models/clues";
import { TeamModel } from "../../models/teams";
import { ResponseModel } from "../../models/responses";
import { Resolvers } from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "../../utils/apolloErrorHandlers";
import { activateHunt } from "./resolverFunctions/activateHunt";
import { markHuntComplete } from "./resolverFunctions/markHuntComplete";

const huntResolver: Resolvers = {
  Mutation: {
    activateHunt,
    markHuntComplete,
    createHunt: async (
      _parent: unknown,
      { input: { name, start_date, end_date, recall_message } },
      { user },
      { operation: { name: opname } }
    ) => {
      try {
        const h_id = createBsonObjectId();
        const hunt = new HuntModel({
          _id: h_id,
          created_by: user._id,
          name,
          start_date,
          end_date,
          recall_message,
        });
        await hunt.save();

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
    updateHunt: async (
      _parent: unknown,
      {
        input: {
          name: newName,
          hunt_id,
          start_date: newStart,
          end_date: newEnd,
          recall_message: newRecall,
        },
      },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const _id = createBsonObjectId(hunt_id);

        // @ts-expect-error
        const formattedStart = new Date(newStart);
        // @ts-expect-error
        const formattedEnd = new Date(newEnd);

        const hunt = await HuntModel.findOneAndUpdate(
          { _id },
          [
            {
              $set: {
                name: {
                  $cond: [
                    {
                      $and: [newName, { $ne: [newName, "$name"] }],
                    },
                    newName,
                    "$name",
                  ],
                },
              },
            },
            {
              $set: {
                start_date: {
                  $cond: [
                    {
                      $and: [
                        newStart,
                        { $ne: [formattedStart, "$start_date"] },
                      ],
                    },
                    formattedStart,
                    "$start_date",
                  ],
                },
              },
            },
            {
              $set: {
                end_date: {
                  $cond: [
                    {
                      $and: [newEnd, { $ne: [formattedEnd, "$end_date"] }],
                    },
                    formattedEnd,
                    "$end_date",
                  ],
                },
              },
            },
            {
              $set: {
                recall_message: {
                  $cond: [
                    {
                      $and: [newRecall, { $ne: [newRecall, "$recallMessage"] }],
                    },
                    newRecall,
                    "$recallMessage",
                  ],
                },
              },
            },
          ],
          { new: true }
        );

        if (!hunt) {
          return throwResolutionError({
            message: "No hunt found to update.",
            location: name?.value,
          });
        }

        return hunt.transformWithTypename();
      } catch (err) {
        return throwServerError({
          message: "Unable to update hunts at this time.",
          location: name?.value,
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

export default { ...huntResolver };
