const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  }, 
  skeletons: [{
    type: Schema.Types.ObjectId,
    ref: 'Skeleton'
  }],
  comments: [{
    type: Schema.Types.ObjectId, 
    ref: 'Comment'
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Like'
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
