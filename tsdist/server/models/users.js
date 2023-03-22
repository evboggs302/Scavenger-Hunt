"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    hunts: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { versionKey: false });
exports.default = mongoose.model("User", userSchema, "users"); // modelName, schemaName, collectionName
