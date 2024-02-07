"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: String,
    },
    priorityLevel: [
        {
            type: String,
        },
    ],
    taskAuthor: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    status: [
        {
            type: String,
            default: 'pending',
        },
    ],
    team: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Team',
        },
    ],
    assignTo: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Task = (0, mongoose_1.model)('Task', taskSchema);
