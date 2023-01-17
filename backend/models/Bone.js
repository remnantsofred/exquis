const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boneSchema = Schema({
    text: {
        type: String,
        required: true
    },
    skeleton: {
        type: Schema.Types.ObjectId,
        ref: 'Skeleton',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Bone', boneSchema);
