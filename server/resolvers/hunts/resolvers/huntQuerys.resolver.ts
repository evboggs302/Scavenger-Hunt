import { HuntModel } from "@models/hunts";
import { ClueModel } from "@models/clues";
import { TeamModel } from "@models/teams";
import { Hunt, Resolvers } from "@generated/graphql";
import { returnedItems } from "@utils/transforms/returnedItems";
import { createBsonObjectId } from "@utils/transforms/createBsonObjectId";
import {
  throwResolutionError,
  throwServerError,
} from "@utils/apolloErrorHandlers";

const resolver: Resolvers = {
  Query: {
    getHuntsByUserId: async (
      _parent: unknown,
      _args,
      { user },
      { operation: { name } }
    ) => {
      try {
        const hunts = await HuntModel.find({ created_by: user._id })
          .sort({ created_date: 1 })
          .exec();

        return hunts.map(returnedItems);
      } catch (err) {
        return throwServerError({
          message: "Unable to get hunts at this time.",
          location: name?.value,
          err,
        });
      }
    },
    getHunt: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const hunt = await HuntModel.findById(id).exec();

        if (!hunt) {
          return throwResolutionError({
            location: name?.value,
            message: "Unable to find hunt.",
          });
        }

        return hunt.transformWithTypename();
      } catch (err) {
        return throwServerError({
          message: "Unable to get hunts at the moment",
          location: name?.value,
          err,
        });
      }
    },
    deleteAllHuntsByUser: async (
      _parent: unknown,
      _args,
      { user },
      { operation: { name } }
    ) => {
      try {
        const { deletedCount } = await HuntModel.deleteMany({
          created_by: user._id,
        }).exec();

        // delete clues
        // delete teams
        // delete responses

        return deletedCount > 0;
      } catch (err) {
        return throwServerError({
          message: "Unable to delete hunts at the moment.",
          location: name?.value,
          err,
        });
      }
    },
  },
  Hunt: {
    clues: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      return await ClueModel.find({
        hunt_id: h_id,
      });
    },
    teams: async (parent: Hunt) => {
      const h_id = createBsonObjectId(parent._id);
      return await TeamModel.find({
        hunt_id: h_id,
      });
    },
  },
};

export default { ...resolver };
