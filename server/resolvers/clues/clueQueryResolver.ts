import { ClueModel } from "../../models/clues";
import { ResponseModel } from "../../models/responses";
import { CluePayload, Resolvers } from "../../generated/graphql";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import { throwServerError } from "../../utils/apolloErrorHandlers";

const clueResolver: Resolvers = {
  Query: {
    getCluesByHuntId: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const h_id = createBsonObjectId(id);

        const orderedClues = await ClueModel.aggregate([
          {
            $match: { hunt_id: h_id },
          },
          { $sort: { order_number: 1 } },
        ]).exec();

        return orderedClues;
      } catch (err) {
        return throwServerError({
          message: "Unable to get clues by hunt at this time.",
          location: name?.value,
          err,
        });
      }
    },
  },
  CluePayload: {
    responses: async (parent: CluePayload) => {
      const clue_id = createBsonObjectId(parent._id);
      return await ResponseModel.find({ clue_id });
    },
  },
};

export default { ...clueResolver };
