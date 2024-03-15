import ResponseModel from "../models/responses";
import { createBsonObjectId } from "../utils/createBsonObjectId";

type AggregateResult = {
  description: string;
  device_number: string;
  hunt_id: string;
  next_clue_id: string;
  next_order_number: number;
  recall_message: string;
  response_id: string;
  team_id: string;
};

export const markResponseCorrect = async (r_id: string) => {
  const res_id = createBsonObjectId(r_id);

  await ResponseModel.findOneAndUpdate(
    { _id: res_id },
    {
      correct: true,
    }
  ).exec();

  const result = await ResponseModel.aggregate<AggregateResult>(
    [
      {
        $match: {
          _id: res_id,
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "team_id",
          foreignField: "_id",
          as: "team",
        },
      },
      {
        $unwind: {
          path: "$team",
        },
      },
      {
        $lookup: {
          from: "hunts",
          localField: "team.hunt_id",
          foreignField: "_id",
          as: "hunt",
        },
      },
      {
        $unwind: {
          path: "$hunt",
        },
      },
      {
        $lookup: {
          from: "clues",
          let: {
            h_id: "$team.hunt_id",
            last_clue_sent: "$team.last_clue_sent",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$hunt_id", "$$h_id"],
                    },
                    {
                      $eq: [
                        "$order_number",
                        {
                          $add: ["$$last_clue_sent", 1],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "next_clue",
        },
      },
      {
        $unwind: {
          path: "$next_clue",
        },
      },
      {
        $project: {
          team_id: 1,
          next_clue: 1,
          response_id: 1,
          device_number: "$team.device_number",
          recall_message: "$hunt.recall_message",
        },
      },
      {
        $set: {
          "next_clue.next_clue_id": "$next_clue._id",
          "next_clue.next_order_number": "$next_clue.order_number",
          response_id: "$_id",
        },
      },
      {
        $unset: ["_id", "next_clue._id"],
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$$ROOT", "$next_clue"],
          },
        },
      },
      {
        $unset: "next_clue",
      },
    ],
    { allowDiskUse: true }
  ).exec();

  console.log(result);
  return result[0];
};
