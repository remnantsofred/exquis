const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Skeleton = mongoose.model('Skeleton');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');
const { requireUser } = require('../../config/passport');
const validateSkeletonInput = require('../../validations/skeletons'); // add skeleton validations
const validateBoneInput = require('../../validations/bones');  // add bone validations
const validateCommentInput = require('../../validations/comments');
const validateLikeInput = require('../../validations/likes');


router.get('/', async (req, res) => {
  let parent;
  try {
    parent = await Skeleton.findById(req.params.skeletonId);
  }

  catch(err) {
    const error = new Error('Parent skeleton not found');
    error.statusCode = 404;
    error.errors = { message: "No parent skeleton found with that id" };
    return next(error); 
  }
  try {
    const likes = await Like.find({ parent: skeleton._id })
                               .sort({ createdAt: -1 })
                               .populate("liker", "_id, username");
    return res.json(likes);
  }
  catch(err) {
    return res.json([]);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const like = await Like.findById(req.params.id)
                             .populate("liker", "id, username");
    return res.json(like);
  }
  catch(err) {
    const error = new Error('Like not found');
    error.statusCode = 404;
    error.errors = { message: "No like found with that id" };
    return next(error);
  }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no 
// current user.) Also attach validateSkeletonInput as a middleware before the 
// route handler.
router.post('/', requireUser, validateLikeInput, async (req, res, next) => {
  try {
    const newLike = new Like({
      parent: req.params.id,
      text: req.body.text,
      liker: req.user._id
    });

    let like = await newLike.save();
    like = await like.populate('liker', '_id, username');
    return res.json(like);
  }
  catch(err) {
    next(err);
  }
});

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const like = await Like.findById(req.params.id);
    if (!like) {
      const error = new Error('Like not found');
      error.statusCode = 404;
      error.errors = { message: "No like found with that id" };
      return next(error);
    }
    if (like.liker.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to delete this like" };
      return next(error);
    }
    await like.remove();
    return res.json(like);
  }
  catch(err) {
    next(err);
  }
});



module.exports = router;