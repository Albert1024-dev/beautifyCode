const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const File = mongoose.model('files', FileSchema);
module.exports = File;