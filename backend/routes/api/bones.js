const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Skeleton = mongoose.model('Skeleton');
const Bone = mongoose.model('Bone');
const { requireUser } = require('../../config/passport');
const validateSkeletonInput = require('../../validations/skeletons');
const validateBoneInput = require('../../validations/bones');


router.get('/skeletons/:skeletonId/:id', requireUser, validateBoneInput, async (req, res, next) => {
  try {
    const skeleton = await Skeleton.findById(req.params.skeletonId);
    if (!skeleton) {
      const error = new Error('Skeleton not found');
      error.statusCode = 404;
      error.errors = { message: "No skeleton found with that id" };
      return next(error);
    }
    const bone = await Bone.findById(req.params.id);
    if (!bone) {  
      const error = new Error('Bone not found');  
      error.statusCode = 404;
      error.errors = { message: "No bone found with that id" };
      return next(error);
    }
    return res.json(bone);
  }
  catch(err) {
    next(err);
  }
});


router.patch('/skeletons/:skeletonId/:id', requireUser, validateBoneInput, async (req, res, next) => {
  try {
    const skeleton = await Skeleton.findById(req.params.skeletonId);
    if (!skeleton) {
      const error = new Error('Skeleton not found');
      error.statusCode = 404;
      error.errors = { message: "No skeleton found with that id" };
      return next(error);
    }
    if (skeleton.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to edit bones on this skeleton" };
      return next(error);
    }
    const bone = await Bone.findById(req.params.id);
    if (!bone) {  
      const error = new Error('Bone not found');  
      error.statusCode = 404;
      error.errors = { message: "No bone found with that id" };
      return next(error);
    }
    bone.text = req.body.text;

    await bone.save();
    return res.json(bone);
  }
  catch(err) {
    next(err);
  }
});


router.delete('/skeletons/:skeletonId/:id', requireUser, async (req, res, next) => {

  try {
    const skeleton = await Skeleton.findById(req.params.skeletonId);
    if (!skeleton) {

      const error = new Error('Skeleton not found');
      error.statusCode = 404;
      error.errors = { message: "No skeleton found with that id" };
      return next(error);
    }
    if (skeleton.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to delete bones from this skeleton" };
      return next(error);
    }
    const bone = await Bone.findById(req.params.id);
    if (!bone) {
      const error = new Error('Bone not found');
      error.statusCode = 404;
      error.errors = { message: "No bone found with that id" };
      return next(error);
    }
    await bone.remove();
    return res.json(bone);
  }
  catch(err) {
    next(err);
  }
});

// router.post('/:skeletonId/bones', requireUser, validateBoneInput, async (req, res, next) => {
router.post('/skeletons/:skeletonId', requireUser, validateBoneInput, async (req, res, next) => {
  // console.log(req.params, "req.params")
    try {
      const skeleton = await Skeleton.findById(req.params.skeletonId);
      if (!skeleton) {
        const error = new Error('Skeleton not found');
        error.statusCode = 404;
        error.errors = { message: "No skeleton found with that id" };
        return next(error);
      }
      /// add currentCollaborator function here later? or just don't show on front end
      // if (skeleton.currentEditor._id.toString() !== req.user._id.toString()) {
      //   const error = new Error('Unauthorized');
      //   error.statusCode = 401;
      //   error.errors = { message: "You are not authorized to add bones to this skeleton" };
      //   return next(error);
      // }
      const newBone = new Bone({
        text: req.body.text,
        skeleton: skeleton._id,
        author: req.user._id
      });
      
      let bone = await newBone.save();
      // bone = await bone.populate('skeleton', '_id, text');
      return res.json(bone);
    }
    catch(err) {
      next(err);
    }
});
  
// router.patch('/:id', requireUser, validateBoneInput, async (req, res, next) => {
//     try {
//       const skeleton = await Skeleton.findById(req.params.skeletonId);
//       if (!skeleton) {
//         const error = new Error('Skeleton not found');
//         error.statusCode = 404;
//         error.errors = { message: "No skeleton found with that id" };
//         return next(error);
//       }
//       if (skeleton.owner.toString() !== req.user._id.toString()) {
//         const error = new Error('Unauthorized');
//         error.statusCode = 401;
//         error.errors = { message: "You are not authorized to edit bones on this skeleton" };
//         return next(error);
//       }
//       const bone = await Bone.findById(req.params.id);
//       if (!bone) {  
//         const error = new Error('Bone not found');  
//         error.statusCode = 404;
//         error.errors = { message: "No bone found with that id" };
//         return next(error);
//       }
//       bone.text = req.body.text;
//       await bone.save();
//       return res.json(bone);
//     }
//     catch(err) {
//       next(err);
//     }
// });

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
    const bones = await Bone.find({author: user._id})
                              .sort({ createdAt: -1 });
    return res.json(bones);
  }
  catch(err) {
    return res.json([]);
  }
});


router.get('/', async (req, res) => {
  try {
    const bones = await Bone.find()
                              .sort({ createdAt: -1 });
    return res.json(bones);
  }
  catch(err) {
    return res.json([]);
  }
});




module.exports = router;