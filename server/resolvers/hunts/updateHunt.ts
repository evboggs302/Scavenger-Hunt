import { MutationResolvers } from "generated/graphql";
import { HuntModel } from "../../models/hunts";
import {
  throwResolutionError,
  throwServerError,
} from "../../utils/apolloErrorHandlers";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";

export const updateHunt: MutationResolvers["updateHunt"] = async (
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
                  $and: [newStart, { $ne: [formattedStart, "$start_date"] }],
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
};
