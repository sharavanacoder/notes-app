const mongoose=require('mongoose');
const opts = {
  timestamps: { currentTime: () => new Date(Date.now() + (5.5 * 60 * 60 * 1000)) }
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

},{timestamps: true});
let Notes =mongoose.model('Notes', noteSchema);
module.exports = Notes;
