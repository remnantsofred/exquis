const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collabRequestSchema = new Schema({
  skeleton: {
    type: Schema.Types.ObjectId,
    ref: 'Skeleton',
    required: true
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: int,
    // 1 = 'pending', 2 = 'accepted', 3 = 'rejected'
    required: true
  },
  
}, {
  timestamps: true
});

module.exports = mongoose.model('CollabRequest', collabRequestSchema);