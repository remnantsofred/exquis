const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Skeleton = mongoose.model('Skeleton');
// const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');
const { requireUser } = require('../../config/passport');
// const validateSkeletonInput = require('../../validations/skeletons'); // add skeleton validations
// const validateBoneInput = require('../../validations/bones');  // add bone validations
// const validateCommentInput = require('../../validations/comments');
// const validateLikeInput = require('../../validations/likes');



router.post("/skeletons/:skeletonId", async (req, res, next) => {
  try {
    const newLike = new Like({
      skeleton: req.params.skeletonId,
      liker: req.body.liker,
      type: req.body.likeType
    });
    let like = await newLike.save();
    like = await like.populate('liker', '_id, username');
    await Skeleton.updateOne({ _id: like.skeleton },{ $push: { likes: like._id } });
    await User.updateOne({_id: like.liker}, {$push: {likes: like._id}});
    like = await like.populate('skeleton', '_id, title');
   
    return res.json(like);
  } catch (err) {
    console.log(err)
    next(err);
  }
});


// router.delete('/:id', requireUser, async (req, res, next) => {
//   try {
//     const like = await Like.findById(req.params.id);
//     if (!like) {
//       const error = new Error('Like not found');
//       error.statusCode = 404;
//       error.errors = { message: "No like found with that id" };
//       return next(error);
//     }
//     if (like.liker.toString() !== req.user._id.toString()) {
//       const error = new Error('Unauthorized');
//       error.statusCode = 401;
//       error.errors = { message: "You are not authorized to delete this like" };
//       return next(error);
//     }
//     await like.remove();
//     await Skeleton.updateOne({_id: like.skeleton}, {$pull: {likes: like._id}});
//     await User.updateOne({_id: like.liker}, {$pull: {likes: like._id}});
//     return res.json(like);
//   }
//   catch(err) {
//     next(err);
//   }
// });

router.delete("/:id",  async (req, res, next) => {
  console.log("backend delete like")
  try {
    const like = await Like.findById(req.params.id);
      if (!like) {
        const error = new Error("Like not found");
        error.statusCode = 404;
        error.errors = {
          message: "No like found with that id",
        };
        return next(error);
      }
      if (like.liker.toString() !== req.user._id.toString()) {
        const error = new Error("Unauthorized");
        error.statusCode = 401;
        error.errors = {
          message: "You are not authorized to delete this like",
        };
        return next(error);
      }
      await like.remove();
      await Skeleton.updateOne({ _id: like.skeleton }, { $pull: { likes: like._id } });
      await User.updateOne({ _id: like.liker }, { $pull: { likes: like._id } });
      return res.json(like);
             
  } catch (err) {
    return next(err);
  }
});


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




router.get("/", async (req, res, next) => {
  try {
    const likes = await Like.find();
    return res.json(likes);
  } catch (err) {
    console.error(err);
    return res.json([]);
  }
});

router.get("/skeletons/:skeletonId"), async (req, res, next) => {
  try {
    const likes = await Like.find({ skeleton: req.params.skeletonId });
    return res.json(likes);
  } catch (err) {
    console.error(err);
    return res.json([]);
  }
}



module.exports = router;