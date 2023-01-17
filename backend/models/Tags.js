const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = Schema({
  name: {
    type: String,
    required: true
  }, 
  taggedSkeletons: [{
    type: Schema.Types.ObjectId,
    ref: 'Skeleton'
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Tag', tagSchema);