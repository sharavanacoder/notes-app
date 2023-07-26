const mongoose=require('mongoose');
const opts = {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
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

},opts);
let Notes =mongoose.model('Notes', noteSchema);
module.exports = Notes;
