const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BoneSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String
  },
}, {
  timestamps: true
});

const skeletonSchema = Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  }, 
  prompt: {
    type: String,
  },
  maxBones: {
    type: Number,
    required: true
  },
  maxCollabrators: {
    type: Number
  },
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }], 
  bones: [BoneSchema],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  likes: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Like'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Skeleton', skeletonSchema);