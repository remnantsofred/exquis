const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = Schema({
  liker: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  skeleton: {
    type: Schema.Types.ObjectId,
    ref: 'Skeleton'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Like', likeSchema);