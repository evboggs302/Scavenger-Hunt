import ResponseModel from "../models/responses";
import { createBsonObjectId } from "../utils/createBsonObjectId";

type AggregateResult = {
  hunt_id: string;
  team_id: string;
  response_id: string;
  device_number: string;
  recall_message: string;
  next_clue: {
    _id: string;
    description: string;
    order_number: number;
  } | null;
};

export const markResponseCorrect = async (
  r_id: string
): Promise<AggregateResult> => {
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
          includeArrayIndex: "next_index",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $set: {
          next_clue: {
            $cond: [
              {
                $eq: ["$next_index", 0],
              },
              "$next_clue",
              null,
            ],
          },
        },
      },
      {
        $project: {
          team_id: 1,
          next_clue: 1,
          response_id: "$_id",
          hunt_id: "$hunt._id",
          device_number: "$team.device_number",
          recall_message: "$hunt.recall_message",
        },
      },
      {
        $unset: ["_id", "next_clue.hunt_id"],
      },
    ],
    { allowDiskUse: true }
  ).exec();

  return result[0];
};
