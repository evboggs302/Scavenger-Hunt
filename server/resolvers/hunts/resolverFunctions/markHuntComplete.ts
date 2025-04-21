import {
  MutationMarkHuntCompleteArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from "generated/graphql";
import { HuntModel } from "models/hunts";
import { throwServerError } from "utils/apolloErrorHandlers";
import { createBsonObjectId } from "utils/transforms/createBsonObjectId";
import { deprovisionNumber } from "utils/twilioActions/deprovisionNumber";

export const markHuntComplete: Resolver<
  ResolverTypeWrapper<boolean>,
  unknown,
  unknown,
  RequireFields<MutationMarkHuntCompleteArgs, "id">
> = async (_parent: unknown, { id }, _ctxt, { operation: { name } }) => {
  try {
    const hunt_id = createBsonObjectId(id);
    const hunt = await HuntModel.findOne({ _id: hunt_id }).exec();
    if (!hunt) {
      return throwServerError({
        location: name?.value,
        message: "Unable to find the specified hunt.",
      });
    }

    await deprovisionNumber(hunt.twilio_number);

    await HuntModel.updateOne(
      { _id: hunt_id },
      { is_active: false, marked_complete: true, twilio_number: "" }
    ).exec();

    return true;
  } catch {
    return throwServerError({
      location: name?.value,
      message: "Unable to deactivate this event.",
    });
  }
};
