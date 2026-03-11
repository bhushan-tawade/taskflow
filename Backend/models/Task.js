const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    category: {
        type: String,
        enum: ["work", "personal", "study"],
        default: "personal"
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },

    status: {
        type: String,
        enum: ["todo", "in_progress", "completed"],
        default: "todo"
    },

    due_date: {
        type: Date
    },

    is_done: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);