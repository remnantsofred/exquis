const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skeletonSchema = Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('skeleton', skeletonSchema);