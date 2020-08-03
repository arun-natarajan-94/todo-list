const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    taskName: {
        type: String
    },
    Description : {
        type: String
    },
    meetingAt: {
        type: String
    },
    reminderBefore: {
        type: String
    },
    expiry: {
        type: String
    },
    completionStatus: {
        type: String
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    editTimeStamp: {
        type: Date
    }
});

const todos = mongoose.model("todostask", todoSchema);

module.exports = todos;