const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Skeleton = mongoose.model('Skeleton');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');
const validateSkeletonInput = require('../../validations/skeletons'); // add skeleton validations
const validateBoneInput = require('../../validations/bones');  // add bone validations
const validateCommentInput = require('../../validations/comments');


router.get('/skeleton/:skeletonId', async (req, res) => {
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
    const comments = await Comment.find({ parent: skeleton._id })
                               .sort({ createdAt: -1 })
                               .populate("author", "_id, username");
    return res.json(comments);
  }
  catch(err) {
    return res.json([]);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
                             .populate("author", "id, username");
    return res.json(comment);
  }
  catch(err) {
    const error = new Error('Comment not found');
    error.statusCode = 404;
    error.errors = { message: "No comment found with that id" };
    return next(error);
  }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no 
// current user.) Also attach validateSkeletonInput as a middleware before the 
// route handler.
router.post('/skeleton/:skeletonId', requireUser, validateSkeletonInput, validateCommentInput, async (req, res, next) => {
  try {
    const newComment = new Comment({
      parent: req.params.id,
      text: req.body.text,
      author: req.user._id
    });

    let comment = await newComment.save();
    comment = await comment.populate('author', '_id, username');
    return res.json(comment);
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;