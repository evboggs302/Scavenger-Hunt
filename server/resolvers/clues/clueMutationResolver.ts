import { ClueModel } from "../../models/clues";
import { returnedItems } from "../../utils/transforms/returnedItems";
import { Resolvers } from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "../../utils/apolloErrorHandlers";

const clueResolver: Resolvers = {
  Mutation: {
    createMultipleClues: async (
      _parent: unknown,
      { input: { cluesList, h_id } },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const mappedClues = cluesList.map((clue) => {
          return { hunt_id, ...clue };
        });

        await ClueModel.insertMany(mappedClues);
        const clues = await ClueModel.find({ hunt_id }).exec();

        return clues.map(returnedItems);
      } catch (err) {
        return throwServerError({
          message: "Unable to create clues at this time.",
          location: name?.value,
          err,
        });
      }
    },
    createSingleClue: async (
      _parent: unknown,
      { input: { clueItem, h_id } },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const clue = new ClueModel({
          hunt_id,
          order_number: clueItem.orderNumber,
          description: clueItem.description,
        });
        await clue.save();

        const allClues = await ClueModel.find({ hunt_id }).exec();

        return allClues.map((clu) => clu.transformWithTypename());
      } catch (err) {
        return throwResolutionError({
          message: "Unable to create clues at this time.",
          location: name?.value,
          err,
        });
      }
    },
    updateClueDescription: async (
      _parent: unknown,
      { input: { clue_id, newDescription } },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const _id = createBsonObjectId(clue_id);
        const updatedClue = await ClueModel.findOneAndUpdate(
          { _id },
          { description: newDescription },
          { new: true }
        );

        if (!updatedClue) {
          return throwResolutionError({
            message: "Failed to update or find the specified clue description.",
            location: name?.value,
          });
        }

        return updatedClue.transformWithTypename();
      } catch (err) {
        return throwServerError({
          message: "Unable to update the clue description at this time.",
          location: name?.value,
          err,
        });
      }
    },
    updateClueOrder: async (
      _parent: unknown,
      { input: { hunt_id: h_id, newOrder } },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt_id = createBsonObjectId(h_id);
        const bulkWriteArr = newOrder.map((id, index) => {
          return {
            updateOne: {
              filter: { _id: createBsonObjectId(id) },
              update: { $set: { order_number: index + 1 } },
            },
          };
        });

        await ClueModel.bulkWrite(bulkWriteArr, { ordered: false });
        const orderedClues = await ClueModel.find({ hunt_id })
          .sort({ order_number: 1 })
          .exec();

        return orderedClues.map(returnedItems);
      } catch (err) {
        return throwServerError({
          message: "Unable to update the clue order at this time.",
          location: name?.value,
          err,
        });
      }
    },
    deleteClueById: async (
      _parent: unknown,
      { clue_id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const _id = createBsonObjectId(clue_id);
        const clue = await ClueModel.findById(_id).exec();

        if (clue) {
          const { deletedCount } = await ClueModel.deleteOne({ _id }).exec();

          const { hunt_id } = clue;
          const orderedClues = await ClueModel.aggregate([
            {
              $match: { hunt_id: hunt_id },
            },
            { $sort: { order_number: 1 } },
          ]).exec();

          const bulkWriteArr = orderedClues.map((clu, index) => {
            return {
              updateOne: {
                filter: { _id: clu._id },
                update: { $set: { order_number: index + 1 } },
              },
            };
          });

          await ClueModel.bulkWrite(bulkWriteArr, { ordered: false });

          return deletedCount === 1;
        } else {
          return throwResolutionError({
            message: "Unable to find the clue to be deleted.",
            location: name?.value,
          });
        }
      } catch (err) {
        return throwServerError({
          message: "Unable to delete clues at this time.",
          location: name?.value,
          err,
        });
      }
    },
    deleteAllCluesByHuntId: async (
      _parent: unknown,
      { hunt_id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const _id = createBsonObjectId(hunt_id);
        const { deletedCount } = await ClueModel.deleteMany({
          hunt_id: _id,
        }).exec();

        return deletedCount > 0;
      } catch {
        return throwServerError({
          message: "Unable to delete clues at this time.",
          location: name?.value,
        });
      }
    },
  },
};

export default { ...clueResolver };
