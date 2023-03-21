"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clueResolvers = void 0;
const clues_1 = require("../../models/clues");
exports.clueResolvers = {
    Query: {
        getCluesByHuntId: (parent, args, context, info) => {
            const { id } = args;
            const h_id = mongoose.Types.ObjectId(id);
            return clues_1.default.aggregate([
                {
                    $match: { hunt_id: h_id },
                },
                { $sort: { order_number: 1 } },
            ]);
            //       .then((clues: [Clue], err) => {
            //     if (err) {
            //       console.log(err);
            //       // logErr("getAllCluesByHunt", err);
            //       throw new ApolloError(
            //         "Error Reported. Please check error logs for more details."
            //       );
            //     }
            //     return clues;
            //   });
        },
        // getFirstClueByHuntId: (parent, args, context, info) => {
        //     const { hunt_id } = args;
        //     const h_id = mongoose.Types.ObjectId(hunt_id);
        //     Clue.findOne({ hunt_id: h_id, order_number: 1 }).then((firstClue, err) => {
        //         if (err) {
        //             logErr("getFirstClue", err);
        //             return res
        //                 .status(500)
        //                 .send("Error Reported. Please check error logs for more details.");
        //         }
        //     },
        // },
    },
    // Mutation: {
    //     createClues: (parent, args, context, info) => {},
    //     updateClueDescription: (parent, args, context, info) => {},
    //     updateClueOrder: (parent, args, context, info) => {},
    //     deleteClueById: (parent, args, context, info) => {},
    //     deleteAllCluesByHuntId: (parent, args, context, info) => {},
    // },
};
