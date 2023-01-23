const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Skeleton = mongoose.model('Skeleton');
const Like = mongoose.model('Like');
const { requireUser } = require('../../config/passport');
const { check } = require("express-validator");
const validateSkeletonInput = require('../../validations/skeletons');
const validateBoneInput = require('../../validations/bones');
const handleValidationErrors = require('../../validations/handleValidationErrors');


router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    const user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const skeletons = await Skeleton.find({ owner: user._id })
                              .sort({ createdAt: -1 })
                              .populate("owner", "_id, username")
                              .populate("collaborators", "_id, username")
                              .populate({path: "comments", populate: { path: "author", select: "_id, username" }})
                              .populate({path: "bones", populate: { path: "author", select: "_id, username" }})
                              // .populate("tags")
                              // .populate("likes")
    return res.json(skeletons);
  }
  catch(err) {
    return res.json([]);
  }
})


router.get('/:id', async (req, res, next) => {
  try {
    const skeleton = await Skeleton.findOne({_id: req.params.id})
                             .populate("owner", "_id, username")
                             .populate("collaborators", "_id, username")
                             .populate({path: "comments", populate: { path: "author", select: "_id, username" }})
                             .populate({path: "bones", populate: { path: "author", select: "_id, username" }})
                           
    return res.json(skeleton);
  }
  catch(err) {
    const error = new Error('Skeleton not found');
    error.statusCode = 404;
    error.errors = { message: "No skeleton found with that id" };
    return next(error);
  }
});

router.patch('/:id', requireUser, validateSkeletonInput, async (req, res, next) => {
  try {
    let skeleton = await Skeleton.findById(req.params.id);
    if (!skeleton) {
      const error = new Error('Skeleton not found');
      error.statusCode = 404;
      error.errors = { message: "No skeleton found with that id" };
      return next(error);
    }
    if (skeleton.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to edit this skeleton" };
      return next(error);
    }
      skeleton.owner = req.user._id,
      skeleton.title = req.body.title,
      skeleton.prompt = req.body.prompt,
      skeleton.maxBones = req.body.maxBones,
      skeleton.maxCollaborators = req.body.maxCollaborators,
      skeleton.collaborators = req.body.collaborators,
      // skeleton.bones = req.body.bones,
      skeleton.tags = req.body.tags
      // need to add future logic to add/remove tags

    let currentCollaborators = [];
    let newCollaborators = [];
    let removedCollaborators = [];

    for (const newCollaborator of req.body.collaborators) {
      if (!skeleton.collaborators.includes(newCollaborator)) {
        newCollaborators.push(newCollaborator);
      } else  {
        currentCollaborators.push(newCollaborator);
      }
    }

    for (const prevCollaborator of skeleton.collaborators) {
      if (!req.body.collaborators.includes(prevCollaborator)) {
        removedCollaborators.push(prevCollaborator);
      }
    }

    await skeleton.save()
    skeleton = await Skeleton.findById(req.params.id).populate("owner", "_id, username")
        .populate("collaborators", "_id, username")
        .populate({path: "comments", populate: { path: "author", select: "_id, username" }})
        .populate({path: "bones", populate: { path: "author", select: "_id, username" }})
    await User.updateMany({_id: {$in: newCollaborators}}, {$push: {skeletons: skeleton._id} });
    await User.updateMany({_id: {$in: removedCollaborators}}, {$pull: {skeletons: skeleton._id} });
 
    
    return res.json(skeleton);
  }
  catch(err) {
    next(err);
  }
});


router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    // const skeleton = await Skeleton.findById(req.params.id);
    const skeleton = await Skeleton.findOneAndDelete({_id: req.params.id});
    if (!skeleton) {
      const error = new Error('Skeleton not found');
      error.statusCode = 404;
      error.errors = { message: "No skeleton found with that id" };
      return next(error);
    }
    if (skeleton.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to delete this skeleton" };
      return next(error);
    }
    // let user = await User.findOneAndUpdate({_id: sameSkeleton.owner._id}, {$pull: {skeletons: sameSkeleton._id}}, {new: true})
    await User.updateOne({_id: skeleton.owner._id}, {$pull: {skeletons: skeleton._id} });
    await User.updateMany({_id: {$in: skeleton.collaborators}}, {$pull: {skeletons: skeleton._id} });
    await skeleton.remove();
    return res.json(skeleton);
  }
  catch(err) {
    next(err);
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
                              .populate("collaborators", "_id, username")
                              .populate("comments")
                              .populate({path: "bones", populate: { path: "author", select: "_id, username" }})
                              .populate({path: "likes", populate: { path: "author", select: "_id, username" }})          
                              .sort({ createdAt: -1 });
    return res.json(skeletons);
  }
  catch(err) {
    return res.json([]);
  }
});


router.post('/', requireUser, validateSkeletonInput, async (req, res, next) => {
   
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
    skeleton = await skeleton
                              // .populate('owner', '_id, username')
                              // .populate("collaborators", "_id, username")
                              // .populate("comments")
                              // .populate("tags")
                              // .populate("likes")
    await User.updateOne({_id: skeleton.owner._id}, {$push: {skeletons: skeleton._id} });
    await User.updateMany({_id: {$in: skeleton.collaborators}}, {$push: {skeletons: skeleton._id} });

    return res.json(skeleton);
  }
  catch(err) {
    next(err);
  }
});




module.exports = router;