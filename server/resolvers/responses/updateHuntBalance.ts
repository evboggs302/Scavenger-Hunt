import { Types } from "mongoose";
import { HuntModel } from "@models/hunts";
import { throwServerError } from "@utils/apolloErrorHandlers";

export const updateHuntBalance = async (
  hunt_id: Types.ObjectId,
  mode: "sms" | "mms" | "provision",
  numberOfMessages: number = 1
) => {
  try {
    let amount: number;
    switch (mode) {
      case "sms": {
        amount = 0.1 * numberOfMessages; // cost per SMS
        break;
      }
      case "mms": {
        amount = 0.3 * numberOfMessages; // cost per MMS
        break;
      }
      case "provision": {
        amount = 2.5; // cost per provisioned number
        break;
      }
      default: {
        const never: never = mode;
        throw new Error(`Unexpected mode: ${never}`);
      }
    }

    const updatedHunt = await HuntModel.findOneAndUpdate(
      { _id: hunt_id },
      { $inc: { balance_usd: amount } }
    ).exec();

    if (!updatedHunt) {
      return throwServerError({
        location: "updateHuntBalance",
        message: "Unable to find the specified hunt.",
      });
    }

    return updatedHunt;
  } catch (err) {
    return throwServerError({
      location: "updateHuntBalance",
      message: "Unable to update hunt balance.",
      err: {
        mode,
        err,
      },
    });
  }
};
