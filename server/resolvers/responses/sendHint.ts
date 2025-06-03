import { Types } from "mongoose";
import { MutationResolvers } from "@generated/graphql";
import { ResponseModel } from "@models/responses";
import { TeamModel } from "@models/teams";
import {
  throwResolutionError,
  throwServerError,
} from "@utils/apolloErrorHandlers";
import { createBsonObjectId } from "@utils/transforms/createBsonObjectId";
import { twilioClient } from "@utils/twilioClient";
import { updateHuntBalance } from "./updateHuntBalance";

type TeamHuntAggregate = {
  _id: Types.ObjectId;
  hunt_id: Types.ObjectId;
  device_number: string;
  twilio_number: string;
};

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

    const activeTeamHunt = await TeamModel.aggregate<TeamHuntAggregate>(
      [
        {
          $match: {
            _id: t_id,
          },
        },
        {
          $lookup: {
            from: "hunts",
            localField: "hunt_id",
            foreignField: "_id",
            as: "hunt",
          },
        },
        { $unwind: { path: "$hunt" } },
        {
          $project: {
            hunt_id: 1,
            device_number: 1,
            twilio_number: "$hunt.twilio_number",
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    )
      .exec()
      .then((res) => res[0]);

    if (!activeTeamHunt)
      return throwResolutionError({
        message: "No team exists for that number.",
        location: name?.value,
      });

    await twilioClient.messages.create({
      body: `${hint_body}`,
      from: activeTeamHunt.twilio_number,
      to: activeTeamHunt.device_number,
    });

    await updateHuntBalance(activeTeamHunt.hunt_id, "sms");

    return true;
  } catch (err) {
    return throwServerError({
      message: "Unable to send hints at this time.",
      location: name?.value,
      err,
    });
  }
};
