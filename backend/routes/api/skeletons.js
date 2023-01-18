const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Skeleton = mongoose.model('Skeleton');
const { requireUser } = require('../../config/passport');
const { check } = require("express-validator");
const validateSkeletonInput = require('../../validations/skeletons');
const validateBoneInput = require('../../validations/bones');
const handleValidationErrors = require('../../validations/handleValidationErrors');



router.get('/user/:userId', async (req, res, next) => {
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
    const skeletons = await Skeleton.find({ owner: user._id })
                              .sort({ createdAt: -1 })
                              .populate("owner", "_id, username", "bones", "_id, body, author");
    return res.json(skeletons);
  }
  catch(err) {
    return res.json([]);
  }
})


router.get('/:id', async (req, res, next) => {
  try {
    const skeleton = await Skeleton.findById(req.params.id)
                             .populate("owner", "id, username");
    return res.json(skeleton);
  }
  catch(err) {
    const error = new Error('Skeleton not found');
    error.statusCode = 404;
    error.errors = { message: "No skeleton found with that id" };
    return next(error);
  }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no 
// current user.) Also attach validateSkeletonInput as a middleware before the 
// route handler.
router.get('/', async (req, res) => {
  try {
    const skeletons = await Skeleton.find()
                              .populate("owner", "_id, username")
                              .sort({ createdAt: -1 });
    return res.json(skeletons);
  }
  catch(err) {
    return res.json([]);
  }
});


router.post('/', requireUser, validateSkeletonInput, async (req, res, next) => {
    console.log("hit backend skeleton post route")
  try {
    const newSkeleton = new Skeleton({
      owner: req.user._id,
      title: req.body.title,
      prompt: req.body.prompt,
      maxBones: req.body.maxBones,
      maxCollaborators: req.body.maxCollaborators,
      collaborators: req.body.collaborators,
      bones: [],
      tags: [],
      likes: [],
      comments: []
    });

    let skeleton = await newSkeleton.save();
    skeleton = await skeleton.populate('owner', '_id, username');
    return res.json(skeleton);
  }
  catch(err) {
    next(err);
  }
});



module.exports = router;