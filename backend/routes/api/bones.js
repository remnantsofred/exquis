const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Skeleton = mongoose.model('Skeleton');
const Bone = mongoose.model('Bone');
const { requireUser } = require('../../config/passport');
const validateSkeletonInput = require('../../validations/skeletons');
const validateBoneInput = require('../../validations/bones');



// router.post('/:skeletonId/bones', requireUser, validateBoneInput, async (req, res, next) => {
router.post('/skeletons/:skeletonId', requireUser, validateBoneInput, async (req, res, next) => {
  console.log(req.params, "req.params")
    try {
      const skeleton = await Skeleton.findById(req.params.skeletonId);
      if (!skeleton) {
        const error = new Error('Skeleton not found');
        error.statusCode = 404;
        error.errors = { message: "No skeleton found with that id" };
        return next(error);
      }
      // if (skeleton.currentEditor._id.toString() !== req.user._id.toString()) {
      //   const error = new Error('Unauthorized');
      //   error.statusCode = 401;
      //   error.errors = { message: "You are not authorized to add bones to this skeleton" };
      //   return next(error);
      // }
      console.log(skeleton, "skeleton")
      const newBone = new Bone({
        text: req.body.text,
        skeleton: skeleton._id,
        author: req.user._id
      });
      
      let bone = await newBone.save();
      bone = await bone.populate('skeleton', '_id, text');
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


module.exports = router;