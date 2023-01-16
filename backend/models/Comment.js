const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Skeleton'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);