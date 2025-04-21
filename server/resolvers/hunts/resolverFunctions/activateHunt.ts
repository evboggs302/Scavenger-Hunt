import {
  MutationActivateHuntArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from "generated/graphql";
import { twilioClient } from "../../../utils/twilioClient";
import { createBsonObjectId } from "utils/transforms/createBsonObjectId";
import { TeamModel } from "models/teams";
import { HuntModel } from "models/hunts";
import {
  throwResolutionError,
  throwServerError,
} from "utils/apolloErrorHandlers";
import { ClueModel } from "models/clues";
import { fetchNewNumber } from "utils/twilioActions/fetchNewNumber";

export const activateHunt: Resolver<
  ResolverTypeWrapper<boolean>,
  unknown,
  unknown,
  RequireFields<MutationActivateHuntArgs, "id">
> = async (_parent: unknown, { id }, _ctxt, { operation: { name } }) => {
  try {
    const hunt_id = createBsonObjectId(id);
    const hunt = await HuntModel.findOne({ _id: hunt_id }).exec();
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
     * FETCH AVAILABLE TWILIO NUMBER
     */
    const twilioNumber = await fetchNewNumber(hunt_id.toString());

    /**
     * UPDATE THE HUNT
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
    Promise.all(
      teams.map((tm) =>
        twilioClient.messages.create({
          body: `CLUE: ${firstClue.description}`,
          from: `${updatedHunt.twilio_number}`,
          to: tm.device_number,
        })
      )
    ).catch((reason) => {
      return throwServerError({
        location: name?.value + "_send_twilio",
        message: "There was a problem sending out the first clue.",
        err: reason,
      });
    });

    return true;
  } catch {
    return throwServerError({
      location: name?.value,
      message: "Unable to activate this event.",
    });
  }
};
