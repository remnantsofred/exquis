const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boneSchema = Schema({
    text: {
        type: String,
        required: true
    },
    skeleton: {
        type: Schema.Types.ObjectId,
        ref: 'Skeleton'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bone', boneSchema);
