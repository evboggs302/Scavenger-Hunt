"use strict";
// import the Model/Schema mongoose created
const Clue = require("./models/clues");
const { logErr } = require("./event_logController");
const mongoose = require("mongoose");
module.exports = {
    createClues: (req, res, next) => {
        const { hunt_id, cluesList } = req.body;
        const h_id = mongoose.Types.ObjectId(hunt_id);
        const mappedClues = cluesList.map((item, index) => {
            return {
                hunt_id: h_id,
                order_number: index + 1,
                description: item,
            };
        });
        Clue.insertMany(mappedClues, { ordered: true }).then((data, err) => {
            if (err) {
                logErr("createClues", err);
                return res
                    .status(500)
                    .send("Error Reported. Please check error logs for more details.");
            }
            return next();
        });
    },
    getAllCluesByHunt: (req, res, next) => {
        const { hunt_id } = req.body;
        const h_id = mongoose.Types.ObjectId(hunt_id);
        Clue.aggregate([
            {
                $match: { hunt_id: h_id },
            },
            { $sort: { order_number: 1 } },
        ]).then((clues, err) => {
            if (err) {
                logErr("getAllCluesByHunt", err);
                return res
                    .status(500)
                    .send("Error Reported. Please check error logs for more details.");
            }
            return res.status(200).send(clues);
        });
    },
    getFirstClue: (req, res, next) => {
        const { hunt_id } = req.body;
        const h_id = mongoose.Types.ObjectId(hunt_id);
        Clue.findOne({ hunt_id: h_id, order_number: 1 }).then((firstClue, err) => {
            if (err) {
                logErr("getFirstClue", err);
                return res
                    .status(500)
                    .send("Error Reported. Please check error logs for more details.");
            }
            req.body.firstClue = firstClue;
            next();
            // res.sendStatus(418); // for tests
        });
    },
    updateDesc: (req, res, next) => {
        const { clue_id, newDesc } = req.body;
        const cl_id = mongoose.Types.ObjectId(clue_id);
        Clue.updateOne({ _id: cl_id }, [
            {
                $set: {
                    description: {
                        $cond: [
                            { $ne: [newDesc, "$description"] },
                            newDesc,
                            "$description",
                        ],
                    },
                },
            },
        ])
            .exec()
            .then((clue, err) => {
            if (err) {
                logErr("updateDesc", err);
                return res
                    .status(500)
                    .send("Error Reported. Please check error logs for more details.");
            }
            return next();
        });
    },
    updateClueOrder: (req, res, next) => {
        // takes in newOrder = [clue_id's]
        const { newOrder } = req.body;
        const bulkWriteArr = newOrder.map((id, index) => {
            return {
                updateOne: {
                    filter: { _id: id },
                    update: { $set: { order_number: index + 1 } },
                },
            };
        });
        try {
            Clue.bulkWrite(bulkWriteArr, { ordered: false }).then((data, err) => {
                if (err) {
                    logErr("updateClueOrder at bulkWrite", err);
                    return res
                        .status(500)
                        .send("Error Reported. Please check error logs for more details.");
                }
                return next();
            });
        }
        catch (err) {
            logErr("updateClueOrder", err);
            return res
                .status(500)
                .send("Error Reported. Please check error logs for more details.");
        }
    },
    deleteSingleClue: (req, res, next) => {
        const { clue_id } = req.body;
        const cl_id = mongoose.Types.ObjectId(clue_id);
        Clue.deleteOne({ _id: cl_id })
            .exec()
            .then((data, err) => {
            if (err) {
                logErr("deleteSingleClue", err);
                return res
                    .status(500)
                    .send("Error Reported. Please check error logs for more details.");
            }
            return next();
        });
    },
    deleteAllCluesByHunt: (req, res, next) => {
        const { hunt_id } = req.body;
        const h_id = mongoose.Types.ObjectId(hunt_id);
        Clue.deleteMany({ hunt_id: h_id })
            .exec()
            .then((data, err) => {
            if (err) {
                logErr("deleteAllCluesByHunt", err);
                return res
                    .status(500)
                    .send("Error Reported. Please check error logs for more details.");
            }
            return next();
        });
    },
};
