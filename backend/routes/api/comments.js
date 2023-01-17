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

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
                              .populate("author", "_id, username")
                              .sort({ createdAt: -1 });
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
    console.log(parent)
    console.log(req.params)
  }

  catch(err) {
    const error = new Error('Parent skeleton not found');
    error.statusCode = 404;
    error.errors = { message: "No parent skeleton found with that id" };
    return next(error); 
  }
  try {
    console.log(Comment.find({ parent: skeleton }), "comment.find({ parent: skeleton })")
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
// current user.) Also attach validateCommentInput as a middleware before the 
// route handler.
// Note: old way
// router.post('/', requireUser, validateCommentInput, async (req, res, next) => {
//   console.log(req.params.id, "params_id")
//   console.log(req.params.skeletonId, "params_skellie_id")
//   console.log(req.body.parent, "req_body_parent")
//   console.log(req.body.text, "req_body_text")
//   console.log(req.user._id, "req_user._id")
//   try {
//     const newComment = new Comment({
//       parent: req.body.parent,
//       text: req.body.text,
//       author: req.user._id
//     });

//     let comment = await newComment.save();
//     comment = await comment.populate('author', '_id, username');
//     return res.json(comment);
//   }
//   catch(err) {
//     next(err);
//   }
// });


router.post('/skeletons/:skeletonId', requireUser, validateCommentInput, async (req, res, next) => {
  try {
    const newComment = new Comment({
      parent: req.params.skeletonId,
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
    return res.json(comment);
  }
  catch(err) {
    next(err);
  }
});



module.exports = router;