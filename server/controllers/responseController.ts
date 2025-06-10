import { ResponseModel } from "@models/responses";
import { TeamModel } from "@models/teams";
import { RequestHandler } from "express";
import { createBsonObjectId } from "@utils/transforms/createBsonObjectId";
import { createErrLog } from "@utils/eventLogHelpers";
import { publishReceivedResponse } from "@utils/pubSub";

export const responseController: Record<string, RequestHandler> = {
  findActiveTeamByDevice: async (req, res, next) => {
    try {
      const team = await TeamModel.aggregate([
        {
          $match: {
            device_number: req.body.From,
            recall_sent: false,
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
        { $unwind: "$hunt" },
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$hunt.is_active", true] },
                {
                  $eq: ["$hunt.twilio_number", req.body.To],
                },
              ],
            },
          },
        },
      ]).exec();

      if (!team[0]) {
        return res.send("No active teams for that number.").status(500);
      }

      req.body.time_received = new Date();
      req.body.team_id = team[0]._id;
      req.body.clue_id = team[0].lastClue_sent;

      return next();
    } catch (err) {
      createErrLog({ location: "findActiveTeamByDevice", err });

      return res
        .status(500)
        .send("Error Reported. Please check error logs for more details.");
    }
  },
  saveSMS: async (req, res, next) => {
    try {
      if (+req.body.NumMedia >= 1) return next(); // move to NEXT to saveMMS

      const { team_id, clue_id, time_received, Body } = req.body;
      const t_id = createBsonObjectId(team_id);
      const c_id = createBsonObjectId(clue_id);
      const timeStamp = new Date(time_received);

      const newRes = await ResponseModel.create({
        _id: createBsonObjectId(),
        clue_id: c_id,
        team_id: t_id,
        response_txt: Body.length ? Body : " ",
        time_received: timeStamp,
      });

      await publishReceivedResponse(newRes.transformWithTypename());

      return res.status(200).send("Response Saved!");
    } catch (err) {
      createErrLog({ location: "saveSMS", err });

      return res
        .status(500)
        .send("Error Reported. Please check error logs for more details.");
    }
  },
  saveMMS: async (req, res) => {
    try {
      const { team_id, clue_id, time_received, Body } = req.body;
      const t_id = createBsonObjectId(team_id);
      const c_id = createBsonObjectId(clue_id);
      const timeStamp = new Date(time_received);
      const media =
        +req.body.NumMedia === 1
          ? req.body.MediaUrl0
          : Object.keys(req.body)
              .filter((k) => k.search("MediaUrl") > -1)
              .map((k) => {
                return req.body[k];
              });

      const newRes = await ResponseModel.create({
        _id: createBsonObjectId(),
        team_id: t_id,
        clue_id: c_id,
        response_txt: Body.length ? Body : " ",
        response_img: media,
        time_received: timeStamp,
      });

      await publishReceivedResponse(newRes.transformWithTypename());

      return res.status(200).send("Response Saved!");
    } catch (err) {
      createErrLog({ location: "saveMMS", err });
      return res
        .status(500)
        .send("Error Reported. Please check error logs for more details.");
    }
  },
};
