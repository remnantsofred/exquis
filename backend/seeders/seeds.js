const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Skeleton = require('../models/Skeleton');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Bone = require('../models/Bone');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

// Seed users
const users = [
  {
    username: "DemoUser",
    email: "
    password: "password",
    avatar: "https://s3.amazonaws.com/skeleton-dev/avatars/1.jpg"
  },
  {
    username: "DemoUser2",
    email: "
    password: "password",
    avatar: "https://s3.amazonaws.com/skeleton-dev/avatars/2.jpg"
  },
  {
    username: "DemoUser3",
    email: "
    password: "password",
    avatar: "https://s3.amazonaws.com/skeleton-dev/avatars/3.jpg"
  }
];

// Seed skeletons
const skeletons = [
  {
    owner: "5e8f3b0b0b0b0b0b0b0b0b0b",
    text: "I'm a skeleton!"
  },

  







  

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = () => {
  console.log("Resetting db and seeding users and tweets...");

  User.collection.drop()
                  .then(() => Skeleton.collection.drop())
                  .then(() => User.insertMany(users))
                  .then(() => Skeleton.insertMany(skeletons))
                  .then(() => Comment.insertMany(comments))
                  .then(() => Like.insertMany(likes))
                  .then(() => Bone.insertMany(bones))
                  .then(() => {
                   console.log("Done!");
                   mongoose.disconnect();
                  })
                  .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                  });
}
