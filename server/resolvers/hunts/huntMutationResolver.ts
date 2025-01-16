import { Types } from "mongoose";
import config from "../../config";
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
import { twilioClient } from "../../utils/twilioClient";

const { TWILIO_NUMBER } = config;

const huntResolver: Resolvers = {
  Mutation: {
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
    activateHunt: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt_id = createBsonObjectId(id);
        const teams = await TeamModel.find<{
          _id: Types.ObjectId;
          device_number: string;
        }>({ hunt_id }, ["_id", "device_number"]).exec();

        const huntsWithActiveDeviceNumbers = await HuntModel.aggregate(
          [
            { $match: { is_active: true } },
            {
              $lookup: {
                from: "teams",
                localField: "_id",
                foreignField: "hunt_id",
                as: "teams",
              },
            },
            { $project: { teams: 1 } },
            { $unwind: { path: "$teams" } },
            {
              $match: {
                "teams.device_number": {
                  $in: teams.map((tm) => tm.device_number),
                },
              },
            },
          ],
          { maxTimeMS: 60000, allowDiskUse: true }
        ).exec();

        if (huntsWithActiveDeviceNumbers.length > 0) {
          return throwResolutionError({
            location: name?.value,
            message: `Unable to activate at this time. The following device numbers are currently associated with an active event: ${huntsWithActiveDeviceNumbers.map((team) => team.device_number).join("\n")}`,
          });
        }

        await HuntModel.updateOne({ _id: hunt_id }, { is_active: true }).exec();

        // GET FIRST CLUE
        const firstClue = await ClueModel.findOne({
          hunt_id,
          order_number: 1,
        }).exec();

        if (!firstClue) {
          return throwResolutionError({
            location: name?.value,
            message: "No first clue esists.",
          });
        }

        /**
         * SEND FIRST CLUE USING TWILIO
         */
        Promise.all(
          teams.map((tm) =>
            twilioClient.messages.create({
              body: `CLUE: ${firstClue.description}`,
              from: `${TWILIO_NUMBER}`,
              to: tm.device_number,
            })
          )
        ).catch((reason) => {
          return throwServerError({
            location: name?.value + "_twilio",
            message: "There was a problem sending out the first clue.",
            err: reason,
          });
        });

        return true;
      } catch {
        return throwServerError({
          location: name?.value,
          message: "Unable to activate this event.",
        });
      }
    },
    markHuntComplete: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt_id = createBsonObjectId(id);

        await HuntModel.updateOne(
          { _id: hunt_id },
          { is_active: false, marked_complete: true }
        ).exec();

        return true;
      } catch {
        return throwServerError({
          location: name?.value,
          message: "Unable to deactivate this event.",
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
