const mongoose = require('mongoose');
const opts = {
    timestamps: { currentTime: () => Date.now }
};
const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    offsetCreated: {
        type: Number,
        required: true,
    },
    offsetUpdated: {
        type: Number,
        required: true,
        default: NaN,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });
let Notes = mongoose.model('Notes', noteSchema);
module.exports = Notes;
