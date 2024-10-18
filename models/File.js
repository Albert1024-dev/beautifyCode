const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    name: {
        type: String,
        isrequired: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const File = mongoose.model('files', FileSchema);