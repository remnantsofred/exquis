const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skeletonSchema = Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  }, 
  prompt: {
    type: String,
  },
  numberBones: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  }, tags: {
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('skeleton', skeletonSchema);