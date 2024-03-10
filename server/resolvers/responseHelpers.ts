// export const getNextClue = (req, res, next) => {
//   const { team_id } = req.body;
//   const t_id = mongoose.Types.ObjectId(team_id);
//   Team.aggregate([
//     { $match: { _id: t_id } },
//     {
//       $lookup: {
//         from: "clues",
//         let: { h_id: "$hunt_id", last_sent: "$lastClue_sent" },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $and: [
//                   { $eq: ["$hunt_id", "$$h_id"] },
//                   { $eq: ["$order_number", { $add: ["$$last_sent", 1] }] },
//                 ],
//               },
//             },
//           },
//         ],
//         as: "nextClue",
//       },
//     },
//     {
//       $lookup: {
//         from: "hunts",
//         localField: "hunt_id",
//         foreignField: "_id",
//         as: "hunt_data",
//       },
//     },
//   ])
//     .allowDiskUse(true)
//     .exec()
//     .then((data, err) => {
//       if (err) {
//         logErr("getNextClue", err);
//         return;
//       }
//       req.body.device_number = data[0].device_number;
//       req.body.hunt_id = data[0].hunt_id;
//       req.body.nextClue = data[0].nextClue[0];
//       req.body.recall_sent = data[0].recall_sent;
//       req.body.recallMessage = data[0].hunt_data[0].recallMessage;
//       next();
//     });
// };
