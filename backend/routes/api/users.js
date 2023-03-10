const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');


/* GET users listing. */
  
router.post('/register', validateRegisterInput, async (req, res, next) => {
  let downcaseEmail =  req.body.email.toLowerCase();
  let downcaseUsername = req.body.username.toLowerCase();
  const user = await User.findOne({
    $or: [{ email: downcaseEmail }, { username: downcaseUsername }]
  });
  
  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email.toLowerCase() === downcaseEmail) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username.toLowerCase() === downcaseUsername) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  const newUser = new User({
    username: downcaseUsername,
    email: downcaseEmail
  });
  
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});


router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user)); 
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    skeletons: req.user.skeletons,
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
                              .populate({
                                path: "skeletons", 
                                populate: [
                                  { path: "collaborators", select: "_id, username" },
                                  { path: "bones", select: "_id, text" },
                                  { path: "comments" }
                                ]})
                              .populate({path: "comments", populate: { path: "parent", select: "_id, title" }})
                              .populate({path: "likes", populate: { path: "skeleton", select: "_id, title" }})
                              .sort({ createdAt: -1})
    return res.json(user);
  }
  catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id." };
    return next(error);
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
                            .populate({
                              path: "skeletons", 
                              populate: [
                                { path: "collaborators", select: "_id, username" },
                                { path: "bones", select: "_id, text" },
                                { path: "comments" }
                              ]})
                            .populate({path: "comments", populate: { path: "parent", select: "_id, title" }})
                            .populate({path: "likes", populate: { path: "skeleton", select: "_id, title" }})
                            .sort({ createdAt: -1})
    return res.json(users);
  }
  catch(err) {
    return res.json([])
  }
});


module.exports = router;
