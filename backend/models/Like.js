const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = Schema({
  liker: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  skeleton: {
    type: Schema.Types.ObjectId,
    ref: 'Skeleton',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Like', likeSchema);