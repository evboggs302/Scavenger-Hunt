import { TeamModel } from "../../../models/teams";
import { ResponseModel } from "../../../models/responses";
import { Resolvers } from "../../../generated/graphql";
import { returnedItems } from "../../../utils/transforms/returnedItems";
import { createBsonObjectId } from "../../../utils/transforms/createBsonObjectId";
import { throwServerError } from "../../../utils/apolloErrorHandlers";

const responseResolver: Resolvers = {
  Query: {
    getResponsesByHunt: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const h_id = createBsonObjectId(id);
        const teams = await TeamModel.find({ hunt_id: h_id }, "_id").exec();

        const responses = await ResponseModel.find({
          team_id: { $in: teams },
        })
          .sort({ time_received: 1 })
          .exec();

        return {
          count: responses.length || 0,
          responses: responses.map((res) => res.transformWithTypename()),
          __typename: "ResponsesByHunt" as const,
        };
      } catch (err) {
        return throwServerError({
          message: "",
          location: name?.value,
          err: new Object(err),
        });
      }
    },
    getResponsesByTeam: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const t_id = createBsonObjectId(id);
        const responses = await ResponseModel.find({ team_id: t_id }).exec();

        return responses.map(returnedItems);
      } catch (err) {
        return throwServerError({
          message: "Unable to find responses at this time.",
          location: name?.value,
          err,
        });
      }
    },
    getResponsesByClue: async (
      _parent: unknown,
      { id },
      _ctxt,
      { operation: { name } }
    ) => {
      try {
        const c_id = createBsonObjectId(id);
        const responses = await ResponseModel.find({
          clue_id: c_id,
        }).exec();

        return responses.map(returnedItems);
      } catch (err) {
        return throwServerError({
          message: "Unable to find responses at this time.",
          location: name?.value,
          err,
        });
      }
    },
  },
};

export default { ...responseResolver };
