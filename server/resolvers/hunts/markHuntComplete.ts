import { MutationResolvers } from "generated/graphql";
import { HuntModel } from "../../models/hunts";
import { throwServerError } from "../../utils/apolloErrorHandlers";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import { deprovisionNumber } from "../../utils/twilioActions/deprovisionNumber";
import { createStripeChargePerHunt } from "../../utils/stripeActions/createStripeChargePerHunt";
import { AccountModel } from "../../models/accounts";

export const markHuntComplete: MutationResolvers["markHuntComplete"] = async (
  _parent: unknown,
  { id },
  _,
  { operation: { name } }
) => {
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

    const account = await AccountModel.findOne({
      user: hunt.created_by,
    }).exec();

    if (!account) {
      return throwServerError({
        location: name?.value,
        message: "Unable to find the specified account.",
      });
    }

    const charge = await createStripeChargePerHunt(account, hunt);

    return charge.status === "succeeded";
  } catch {
    return throwServerError({
      location: name?.value,
      message: "Unable to deactivate this event.",
    });
  }
};
