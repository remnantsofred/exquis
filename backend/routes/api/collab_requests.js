const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Skeleton = mongoose.model('Skeleton');
const CollabRequest = mongoose.model('CollabRequest');
// const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');
// const validateSkeletonInput = require('../../validations/skeletons'); // add skeleton validations
// const validateBoneInput = require('../../validations/bones');  // add bone validations
// const validateCommentInput = require('../../validations/comments');
// const validateLikeInput = require('../../validations/likes');

router.post('/collabrequests/:skeletonId', async (req, res, next) => {
  try {
    const newCpllabRequest = new CollabRequest({
      skeleton: req.params.skeletonId,
      requester: req.body.requesterId,
      receiver: req.body.receiverId,
      status: req.body.status
    });
    let collabRequest = await newCollabRequest.save();
    collabRequest = await collabRequest.populate('liker', '_id, username');
    await Skeleton.updateOne({ _id: like.skeleton },{ $push: { likes: like._id } });
    await User.updateOne({_id: like.liker}, {$push: {likes: like._id}});
    request = await collabRequest.populate('skeleton', '_id, title');
   
    return res.json(request);
  } catch (err) {
    next(err);
  }
});


router.delete("/skeletons/:skeletonId",  requireUser, async (req, res, next) => {

  try {
    const like = await Like.find({skeleton: req.params.skeletonId, liker: req.body.currentUserId}); // assuming we get an arr back
    const firstLike = like[0];

      if (!like) {
        const error = new Error("Like not found");
        error.statusCode = 404;
        error.errors = {
          message: "No like found with that id",
        };
        return next(error);
      }
      const deletedLike = await Like.findOneAndDelete({_id: firstLike._id});
      await Skeleton.updateOne({ _id: like.skeleton }, { $pull: { likes: like._id } });
      await User.updateOne({ _id: like.liker }, { $pull: { likes: like._id } });
      return res.json(like);  
  } catch (err) {
    return next(err);
  }
});

router.get('/skeletons/:skeletonId', async (req, res, next) => {
  try {
    const likes = await Like.find({ skeleton: req.params.skeletonId });
    return res.json(likes);
  } catch (err) {
    console.error(err);
    return res.json([]);
  }
})


router.get("/", async (req, res, next) => {
  try {
    const likes = await Like.find();
    return res.json(likes);
  } catch (err) {
    console.error(err);
    return res.json([]);
  }
});




module.exports = router;