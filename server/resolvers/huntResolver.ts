import { createBsonObjectId } from "../utils/createBsonObjectId";
import { throwResolutionError } from "../utils/eventLogHelpers";
import HuntModel from "../models/hunts";
import ClueModel from "../models/clues";
import TeamModel from "../models/teams";
import { Hunt, Resolvers } from "../generated/graphql";
import { returnedItems } from "../utils/returnedItems";

export const huntResolver: Resolvers = {
  Query: {
    getHuntsByUserId: async (_: unknown, {}, { user }) => {
      try {
        const hunts = await HuntModel.find({ created_by: user._id })
          .sort({ created_date: 1 })
          .exec();

        return hunts.map(returnedItems);
      } catch (err) {
        return throwResolutionError({ location: "getHuntsByUserId", err });
      }
    },
    getHunt: async (_: unknown, { id }) => {
      try {
        const hunt = await HuntModel.findById(id).exec();

        if (!hunt) {
          return throwResolutionError({
            location: "getHunt",
            err: null,
            message: "Unable to find Hunt",
          });
        }

        return hunt.toObject();
      } catch (err) {
        return throwResolutionError({ location: "getHunt", err });
      }
    },
    // activateHunt: async (_: unknown, { id }) => {},
    // deactivateHunt: async (_: unknown, { id }) => {},
    deleteAllHuntsByUser: async (_: unknown, {}, { user }) => {
      try {
        const { deletedCount } = await HuntModel.deleteMany({
          created_by: user._id,
        }).exec();

        return deletedCount > 0;
      } catch (err) {
        return throwResolutionError({
          location: "deleteAllHuntsByUser",
          err,
        });
      }
    },
  },
  Mutation: {
    createHunt: async (
      _: unknown,
      { input: { name, start_date, end_date } },
      { user }
    ) => {
      try {
        const h_id = createBsonObjectId();
        const hunt = new HuntModel({
          _id: h_id,
          created_by: user._id,
          name,
          start_date,
          end_date,
        });
        await hunt.save();

        const createdHunt = await HuntModel.findOne({ _id: h_id }).exec();
        if (!createdHunt) {
          return throwResolutionError({
            location: "createHunt",
            err: null,
            message: "Failed to create or find the specified hunt.",
          });
        }

        return createdHunt.toObject();
      } catch (err) {
        return throwResolutionError({ location: "createHunt", err });
      }
    },
    updateHunt: async (
      _: unknown,
      {
        input: {
          hunt_id,
          start_date: newStart,
          end_date: newEnd,
          recall_message: newRecall,
        },
      }
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
                start_date: {
                  $cond: [
                    {
                      $and: [
                        newStart,
                        { $ne: [formattedStart, "$start_date"] },
                      ],
                    },
                    newStart,
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
                    newEnd,
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
            location: "updateHuntDates",
            err: null,
            message: `No hunt found to update. Hunt value: ${hunt}`,
          });
        }

        return hunt.toObject();
      } catch (err) {
        return throwResolutionError({
          location: "updateHuntDates",
          err,
        });
      }
    },
    deleteHuntById: async (_: unknown, { h_id }) => {
      try {
        const _id = createBsonObjectId(h_id);
        const { deletedCount } = await HuntModel.deleteOne({ _id }).exec();

        return deletedCount === 1;
      } catch (err) {
        return throwResolutionError({
          location: "deleteHuntById",
          err,
        });
      }
    },
  },
  Hunt: {
    clues: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      const clues = await ClueModel.find({
        hunt_id: h_id,
      }).exec();
      return clues.map(returnedItems);
    },
    teams: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      const teams = await TeamModel.find({
        hunt_id: h_id,
      }).exec();
      return teams.map(returnedItems);
    },
  },
};
