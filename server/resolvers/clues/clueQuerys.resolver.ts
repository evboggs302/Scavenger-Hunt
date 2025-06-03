import { ClueModel } from "@models/clues";
import { ResponseModel } from "@models/responses";
import { CluePayload, Resolvers } from "@generated/graphql";
import { createBsonObjectId } from "@utils/transforms/createBsonObjectId";
import { throwServerError } from "@utils/apolloErrorHandlers";

const resolver: Resolvers = {
  Query: {
    getCluesByHuntId: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt_id = createBsonObjectId(id);

        const orderedClues = await ClueModel.find({ hunt_id })
          .sort({ order_number: 1 })
          .exec();

        return orderedClues.map((clue) => clue.transformWithTypename());
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

export default { ...resolver };
