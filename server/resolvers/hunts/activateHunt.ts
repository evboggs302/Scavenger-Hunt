import { MutationResolvers } from "generated/graphql";
import { createBsonObjectId } from "../../utils/transforms/createBsonObjectId";
import { TeamModel } from "../../models/teams";
import { HuntDocType, HuntModel } from "../../models/hunts";
import {
  throwResolutionError,
  throwServerError,
} from "../../utils/apolloErrorHandlers";
import { ClueModel } from "../../models/clues";
import { fetchNewNumber } from "../../utils/twilioActions/fetchNewNumber";
import { twilioClient } from "utils/twilioClient";
import { updateHuntBalance } from "resolvers/responses/updateHuntBalance";

export const activateHunt: MutationResolvers["activateHunt"] = async (
  _parent: unknown,
  { id },
  _ctxt,
  { operation: { name } }
) => {
  let hunt: HuntDocType | null = null;
  try {
    const hunt_id = createBsonObjectId(id);
    hunt = await HuntModel.findOne({ _id: hunt_id }).exec();
    const teams = await TeamModel.find({ hunt_id }).exec();
    const clues = await ClueModel.find({ hunt_id }).exec();

    /**
     * CHECK IF HUNT HAS START DATE, TEAMS, & CLUES
     * IF NOT, RETURN ERROR
     */
    if (
      !hunt ||
      !hunt.start_date ||
      hunt.is_active ||
      !teams.length ||
      !clues.length
    ) {
      return throwResolutionError({
        location: name?.value,
        message: "Unable to find the specified hunt.",
      });
    }
    /**
     * UPDATE THE HUNT: twilio_number
     */
    await HuntModel.findOneAndUpdate(
      { _id: hunt_id },
      {
        is_active: true,
        start_date: new Date(),
      }
    ).exec();

    /**
     * FETCH AVAILABLE TWILIO NUMBER
     */
    const twilioNumber = await fetchNewNumber(hunt_id.toString());

    /**
     * UPDATE THE HUNT: twilio_number
     */
    const updatedHunt = await HuntModel.findOneAndUpdate(
      { _id: hunt_id },
      {
        is_active: true,
        start_date: new Date(),
        twilio_number: twilioNumber,
      }
    ).exec();

    if (!updatedHunt) {
      return throwServerError({
        location: name?.value,
        message: "Unable to activate this event.",
      });
    }

    // GET FIRST CLUE
    const firstClue = await ClueModel.findOne({
      hunt_id,
      order_number: 1,
    }).exec();

    if (!firstClue) {
      return throwResolutionError({
        location: name?.value,
        message: "No first clue esists.",
      });
    }

    /**
     * SEND FIRST CLUE USING TWILIO
     */
    await Promise.all([
      ...teams.map((tm) =>
        twilioClient.messages.create({
          body: `CLUE: ${firstClue.description}`,
          from: updatedHunt.twilio_number,
          to: tm.device_number,
        })
      ),
      updateHuntBalance(hunt_id, "provision"),
      updateHuntBalance(hunt_id, "sms", teams.length),
    ]).catch((reason) => {
      return throwServerError({
        location: name?.value + "_send_twilio",
        message: "There was a problem sending out the first clue.",
        err: reason,
      });
    });

    return true;
  } catch {
    if (hunt) {
      await HuntModel.updateOne(
        { _id: hunt._id },
        {
          ...hunt,
          balance_usd: 0,
          is_active: false,
          twilio_number: "",
        }
      ).exec();
    }

    return throwServerError({
      location: name?.value,
      message: "Unable to activate this event.",
    });
  }
};
