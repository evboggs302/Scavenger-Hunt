"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    type: {
        type: String,
        required: true,
    },
    where: {
        type: String,
        required: true,
    },
    body: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
    },
    time_stamp: {
        type: Date,
        required: true,
    },
}, { versionKey: false });
logSchema.index({ time_stamp: 1 }, { expires: "1 year" });
exports.default = mongoose_1.default.model("Log", logSchema, "event_logs"); // modelName, schemaName, collectionName
