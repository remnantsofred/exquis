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




router.get('/users/:userId', async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const comments = await Comment.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id, username");
    return res.json(comments);
  }
  catch(err) {
    return res.json([]);
  }
})


router.get('/skeletons/:skeletonId', async (req, res) => {
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

    const comments = await Comment.find({ parent: parent._id })
                               .sort({ createdAt: -1 })
                               .populate("author", "_id, username");
    return res.json(comments);
  }
  catch(err) {
    return res.json([]);
  }
});



router.post('/skeletons/:skeletonId', requireUser, async (req, res, next) => {
  try {
    const newComment = new Comment({
      parent: req.params.skeletonId,
      text: req.body.text,
      author: req.user._id
    });
    
    let comment = await newComment.save();
    await Skeleton.updateOne({_id: req.params.skeletonId}, {$push: {comments: comment._id}});
    await User.updateOne({_id: comment.author}, {$push: {comments: comment._id}});
    comment = await comment.populate('author', '_id, username');

    return res.json(comment);
  }
  catch(err) {
    next(err);
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



router.patch('/:id', requireUser, validateCommentInput, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: "No comment found with that id" };
      return next(error);
    }
    if (comment.author.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to edit this comment" };
      return next(error);
    }
    comment.text = req.body.text;
    await comment.save();
    return res.json(comment);
  }
  catch(err) {
    next(err);
  }
});



router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: "No comment found with that id" };
      return next(error);
    }
    if (comment.author.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to delete this comment" };
      return next(error);
    }
    await comment.remove();
    await Skeleton.updateOne({_id: comment.parent}, {$pull: {comments: comment._id}});
    await User.updateOne({_id: comment.author}, {$pull: {comments: comment._id}});
    return res.json(comment);
  }
  catch(err) {
    next(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
                              .populate("author", "_id, username")
                              .populate("author")
                              .sort({ createdAt: -1 });
    return res.json(comments);
  }
  catch(err) {
    return res.json([]);
  }
})


module.exports = router;