"use strict";
const huntSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: new Date(),
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    recallMessage: {
        type: String,
        default: "You've completed your hunt.",
    },
}, { versionKey: false });
module.exports = mongoose.model("Hunt", huntSchema, "hunts"); // modelName, schemaName, collectionName
