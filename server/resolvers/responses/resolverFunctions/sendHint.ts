import { MutationResolvers } from "generated/graphql";
import { ResponseModel } from "../../../models/responses";
import { TeamModel } from "../../../models/teams";
import {
  throwResolutionError,
  throwServerError,
} from "../../../utils/apolloErrorHandlers";
import { createBsonObjectId } from "../../../utils/transforms/createBsonObjectId";
import { twilioClient } from "../../../utils/twilioClient";

export const sendHint: MutationResolvers["sendHint"] = async (
  _parent,
  { input: { response_id, team_id, hint_body } },
  _ctxt,
  { operation: { name } }
) => {
  try {
    const t_id = createBsonObjectId(team_id);
    const r_id = createBsonObjectId(response_id);
    const response = await ResponseModel.findOneAndUpdate(
      { _id: r_id },
      { hintSent: true },
      { new: true }
    );

    if (!response) {
      return throwResolutionError({
        message: "Unable to send a hint for this response.",
        location: name?.value,
      });
    }

    const activeTeamHunt = await TeamModel.aggregate([
      {
        $match: { _id: t_id },
      },
      {
        $lookup: {
          from: "hunts",
          localField: "_id",
          foreignField: "hunt_id",
          as: "hunts",
        },
      },
    ]).exec();

    if (!activeTeamHunt)
      return throwResolutionError({
        message: "No team exists for that number.",
        location: name?.value,
      });

    await twilioClient.messages.create({
      body: `${hint_body}`,
      from: `${activeTeamHunt[0].twilio_number}`,
      to: activeTeamHunt[0].device_number,
    });

    return true;
  } catch (err) {
    return throwServerError({
      message: "Unable to send hints at this time.",
      location: name?.value,
      err,
    });
  }
};
