"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const clueSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hunt_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    order_number: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { versionKey: false });
exports.default = mongoose.model("Clue", clueSchema, "clues"); // modelName, schemaName, collectionName
