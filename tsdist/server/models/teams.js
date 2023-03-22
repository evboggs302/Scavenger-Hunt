"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hunt_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    members: {
        type: [String],
        required: true,
    },
    device_number: {
        type: String,
        required: true,
    },
    lastClue_sent: {
        type: Number,
        default: 0,
    },
    recall_sent: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false });
exports.default = mongoose.model("Team", teamSchema, "teams"); // modelName, schemaName, collectionName
